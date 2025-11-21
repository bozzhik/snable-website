import {NextRequest, NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase'
import {isSuspiciousDomain} from '@/utils/filterSessions'

export type Note = 'DANGER' | 'FOCUS' | 'SKIP' | 'DUPLICATE' | null

export type TabInfo = {
  favicon: string | null
  url: string
  title: string

  id: string
  created_at: string
  note: Note
}

export async function POST(request: NextRequest) {
  try {
    const data: TabInfo = await request.json()

    const {data: existingData} = await supabase.from('sessions').select().eq('url', data.url).limit(1)

    if (existingData && existingData.length > 0) {
      console.log('Tab already exists in Supabase:', existingData[0])
      return NextResponse.json(
        {
          message: 'Tab already exists',
          data: existingData[0],
        },
        {status: 200},
      )
    }

    // Check if URL should be marked as DANGER
    const isDanger = isSuspiciousDomain(data.url)
    const note = isDanger ? 'DANGER' : null

    const {data: insertedData, error} = await supabase
      .from('sessions')
      .insert([
        {
          favicon: data.favicon,
          url: data.url,
          title: data.title,
          note: note,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    console.log(`New tab stored in Supabase (${note ? 'DANGER' : 'SAFE'}):`, insertedData)
    return NextResponse.json(
      {
        message: 'Tab stored successfully',
        data: insertedData,
      },
      {status: 200},
    )
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json(
      {
        error: `Internal Server Error`,
        message: `${error}`,
      },
      {status: 500},
    )
  }
}
