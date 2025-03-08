import {NextRequest, NextResponse} from 'next/server'

export type TabInfo = {
  favicon: string | null
  url: string
  title: string
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    console.log('Tab received successfully:', data)
    return NextResponse.json({message: 'Tab received successfully', data: data}, {status: 200})
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json({error: `Internal Server Error`, message: `${error}`}, {status: 500})
  }
}
