import {NextRequest, NextResponse} from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Email sent successfully:', body)
    return NextResponse.json({message: 'Email sent successfully', body: body}, {status: 200})
  } catch (error) {
    console.error('Internal Server Error:', error)
    return NextResponse.json({error: `Internal Server Error`, message: `${error}`}, {status: 500})
  }
}
