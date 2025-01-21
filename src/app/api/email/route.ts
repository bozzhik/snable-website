import {NextRequest, NextResponse} from 'next/server'
import {Resend} from 'resend'

import {TeaserEmail} from '@/app/api/email/TeaserEmail'

export type FormFields = {
  email: string
}

const resend = new Resend(process.env.RESEND_API_KEY)
const EMAIL_LIST = {
  from: 'notify@snable.website',
  to: 'bozzhik@gmail.com',
}
export const SUBJECT = 'New audience member'

export async function POST(req: NextRequest) {
  const body: FormFields = await req.json()
  const {email} = body

  if (!email) {
    console.error('Internal Server Error: 400')
    return NextResponse.json({error: 'Missing required fields'}, {status: 400})
  }

  try {
    const {data, error} = await resend.emails.send({
      from: `NOTIFY | SNABLE CHROME EXTENSION <${EMAIL_LIST.from}>`,
      to: EMAIL_LIST.to,
      subject: SUBJECT,
      react: TeaserEmail({
        email: body.email,
      }),
    })

    if (error) {
      console.error('Internal Server Error: 400')
      return NextResponse.json({message: 'Email sending failed', error}, {status: 400})
    }

    console.log('Email sent successfully:', body)
    return NextResponse.json({message: 'Email sent successfully', data}, {status: 200})
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({message: 'Failed to send email', error}, {status: 500})
  }
}
