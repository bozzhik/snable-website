/**
 * Dataset Export API Endpoint
 *
 * Exports user and session data in CSV or JSON format for ML analysis.
 *
 * @route GET /api/dataset
 *
 * @queryParams:
 * - secret (optional): Authentication secret (SNABLE_SECRET) - sets cookie for future requests
 * - format (optional): Export format - 'csv' (default) or 'json'
 * - table (optional): Data table to export - 'users', 'sessions', or 'all' (default)
 * - limit (optional): Maximum number of records to export (default: 1000)
 *
 * @example:
 * GET /api/dataset?secret=snable-secret
 * GET /api/dataset?format=csv&table=users&limit=500
 * GET /api/dataset?format=json&table=sessions
 * GET /api/dataset?table=all&limit=2000
 *
 * @returns:
 * - CSV: Text/csv content with headers (separate files for users/sessions)
 * - JSON: JSON object with {users: [], sessions: []} structure
 * - Error: JSON error response with status codes
 *
 * @note:
 * - For table='all' in CSV format: returns JSON with download links for separate CSV files
 * - For table='all' in JSON format: returns both users and sessions arrays
 * - Use separate requests for users and sessions CSV files for better ML analysis
 * - CSV format for 'all' provides direct download URLs for each data type
 * - Authentication via cookies after initial secret parameter
 *
 * @security:
 * - Requires valid SNABLE_SECRET in query parameters (first time) or cookies
 * - Secret parameter sets cookie for future requests
 */

import type {Session, User} from '@/utils/getDashboard'

import {NextRequest, NextResponse} from 'next/server'

import {flattenForCSV, reorderSessionData, reorderUserData, toCSV, USER_COLUMNS, SESSION_COLUMNS} from '@api/dataset/utils'

import {supabase} from '@/lib/supabase'

type ExportFormat = 'csv' | 'json'
type ExportTable = 'users' | 'sessions' | 'all'

export async function GET(request: NextRequest) {
  try {
    // Authentication check - support both secret param and cookie
    const secretParam = request.nextUrl.searchParams.get('secret')
    const secretCookie = request.cookies.get('snable-secret')

    // If secret param is provided, set cookie and continue
    if (secretParam === process.env.SNABLE_SECRET) {
      const response = await handleDatasetRequest(request)
      response.cookies.set('snable-secret', process.env.SNABLE_SECRET!, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 дней
      })
      return response
    }

    // If no secret param but valid cookie, continue
    if (secretCookie && secretCookie.value === process.env.SNABLE_SECRET) {
      return await handleDatasetRequest(request)
    }

    // No valid authentication
    return NextResponse.json(
      {
        error: 'Unauthorized',
        message: 'Invalid or missing secret. Please provide secret parameter or authenticate via dashboard.',
        hint: 'Visit /dashboard?secret=snable-secret first, or provide secret parameter',
      },
      {status: 401},
    )
  } catch (error) {
    console.error('Dataset export error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: `Failed to export dataset: ${error}`,
      },
      {status: 500},
    )
  }
}

async function handleDatasetRequest(request: NextRequest) {
  try {
    // Parse query parameters
    const format = (request.nextUrl.searchParams.get('format') as ExportFormat) || 'csv'
    const table = (request.nextUrl.searchParams.get('table') as ExportTable) || 'all'
    const limitParam = request.nextUrl.searchParams.get('limit')
    const limit = limitParam ? Math.min(parseInt(limitParam, 10), 10000) : 1000

    // Validate parameters
    if (!['csv', 'json'].includes(format)) {
      return NextResponse.json(
        {
          error: 'Invalid format',
          message: 'Format must be either "csv" or "json"',
        },
        {status: 400},
      )
    }

    if (!['users', 'sessions', 'all'].includes(table)) {
      return NextResponse.json(
        {
          error: 'Invalid table',
          message: 'Table must be either "users", "sessions", or "all"',
        },
        {status: 400},
      )
    }

    const result: {
      users?: User[]
      sessions?: Session[]
    } = {}

    // Fetch data based on table parameter
    if (table === 'users' || table === 'all') {
      const {data: users, error: usersError} = await supabase
        .from('users')
        .select('*')
        .order('updated_at', {ascending: false})
        .limit(table === 'all' ? Math.floor(limit / 2) : limit)

      if (usersError) throw usersError
      result.users = users || []
    }

    if (table === 'sessions' || table === 'all') {
      const {data: sessions, error: sessionsError} = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', {ascending: false})
        .limit(table === 'all' ? Math.floor(limit / 2) : limit)

      if (sessionsError) throw sessionsError
      result.sessions = sessions || []
    }

    // Format response based on requested format
    if (format === 'json') {
      // Reorder JSON data according to type definitions
      const orderedResult: {
        users?: Record<string, unknown>[]
        sessions?: Record<string, unknown>[]
      } = {}

      if (result.users) {
        orderedResult.users = reorderUserData(result.users)
      }

      if (result.sessions) {
        orderedResult.sessions = reorderSessionData(result.sessions)
      }

      return NextResponse.json(orderedResult, {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    }

    // CSV format - for 'all' table, return instructions for separate downloads
    if (table === 'all') {
      // Return JSON with download instructions and data counts
      const baseUrl = request.nextUrl.origin
      const limitParam = request.nextUrl.searchParams.get('limit')

      // Build URLs without secret parameter (using cookies for auth)
      const usersUrl = limitParam ? `${baseUrl}/api/dataset?table=users&format=csv&limit=${limit}` : `${baseUrl}/api/dataset?table=users&format=csv`

      const sessionsUrl = limitParam ? `${baseUrl}/api/dataset?table=sessions&format=csv&limit=${limit}` : `${baseUrl}/api/dataset?table=sessions&format=csv`

      return NextResponse.json(
        {
          message: 'For CSV export of all data, please download files separately:',
          downloads: {
            users: {
              url: usersUrl,
              filename: 'snable_users.csv',
              count: result.users?.length || 0,
              schema: USER_COLUMNS.map((col) => col).join(', '),
            },
            sessions: {
              url: sessionsUrl,
              filename: 'snable_sessions.csv',
              count: result.sessions?.length || 0,
              schema: SESSION_COLUMNS.map((col) => col).join(', '),
            },
          },
          summary: {
            total_users: result.users?.length || 0,
            total_sessions: result.sessions?.length || 0,
            limit_used: limit,
          },
          note: 'Use the URLs above to download individual CSV files, or use format=json to get all data in one response',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate',
          },
        },
      )
    } else {
      // Single table CSV export
      const data = (result[table as keyof typeof result] as Record<string, unknown>[]) || []

      if (data.length === 0) {
        return NextResponse.json(
          {
            error: 'No data found',
            message: `No ${table} data available for export`,
          },
          {status: 404},
        )
      }

      // Reorder data according to type definitions
      const reorderedData = table === 'users' ? reorderUserData(data as User[]) : reorderSessionData(data as Session[])
      const flattenedData = flattenForCSV(reorderedData)

      // Use the column order for headers
      const headers = table === 'users' ? Array.from(USER_COLUMNS) : Array.from(SESSION_COLUMNS)
      const csvContent = toCSV(flattenedData, headers)

      return new NextResponse(csvContent, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="snable_${table}.csv"`,
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      })
    }
  } catch (error) {
    console.error('Dataset export error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: `Failed to export dataset: ${error}`,
      },
      {status: 500},
    )
  }
}
