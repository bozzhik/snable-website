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

    console.log('New tab stored in Supabase:', insertedData)
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
