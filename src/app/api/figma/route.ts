import {NextRequest, NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase'

export type FigmaPluginData = {
  token: string
  figma_plugin: {
    urls: string[]
  }
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight
export async function OPTIONS() {
  console.log('OPTIONS request received for /api/figma')
  return new NextResponse(null, {
    status: 200,
    headers: corsHeaders,
  })
}

export async function POST(request: NextRequest) {
  console.log('POST request received for /api/figma')

  try {
    const data: FigmaPluginData = await request.json()
    // console.log('Received data:', JSON.stringify(data, null, 2))

    if (!data.token) {
      console.log('Error: Token is missing')
      return NextResponse.json(
        {
          error: 'Bad Request',
          message: 'Token is required',
        },
        {status: 400, headers: corsHeaders},
      )
    }

    console.log('Looking for user with token:', data.token)
    // Check if user exists
    const {data: existingUser} = await supabase.from('users').select().eq('token', data.token).limit(1)

    // console.log('User lookup result:', existingUser)

    if (!existingUser || existingUser.length === 0) {
      console.log('Error: User not found for token:', data.token)
      return NextResponse.json(
        {
          error: 'Not Found',
          message: 'User with this token not found',
        },
        {status: 404, headers: corsHeaders},
      )
    }

    console.log('User found, updating figma plugin data...')

    // Get current count and increment
    const currentCount = existingUser[0]?.figma_plugin_count || 0
    const newCount = currentCount + 1

    // Update user with figma plugin data
    const {data: updatedUser, error: updateError} = await supabase
      .from('users')
      .update({
        figma_plugin: {
          count: newCount,
          urls: data.figma_plugin.urls,
        },
        figma_plugin_count: newCount,
        updated_at: new Date().toISOString(),
      })
      .eq('token', data.token)
      .select()

    if (updateError) {
      console.log('Update error:', updateError)
      throw updateError
    }

    console.log('Figma plugin data updated successfully!')
    return NextResponse.json(
      {
        message: 'Figma plugin data updated successfully',
        data: updatedUser,
      },
      {status: 200, headers: corsHeaders},
    )
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: `${error}`,
      },
      {status: 500, headers: corsHeaders},
    )
  }
}
