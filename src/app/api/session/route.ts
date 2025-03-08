import {NextRequest, NextResponse} from 'next/server'
import {supabase} from '@/lib/supabase'

export type TabInfo = {
  favicon: string | null
  url: string
  title: string
}

export async function POST(request: NextRequest) {
  try {
    const data: TabInfo = await request.json()

    const {data: insertedData, error} = await supabase
      .from('sessions')
      .insert([
        {
          favicon: data.favicon,
          url: data.url,
          title: data.title,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    console.log('Tab stored in Supabase successfully:', insertedData)
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
