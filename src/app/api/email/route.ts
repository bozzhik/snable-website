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
  let {email} = body

  if (!email) {
    console.error('Internal Server Error: 400')
    return NextResponse.json({error: 'Missing required fields'}, {status: 400})
  }

  email = email.trim().toLowerCase()

  try {
    // Send email
    const {data: emailData, error: emailError} = await resend.emails.send({
      from: `NOTIFY | SNABLE CHROME EXTENSION <${EMAIL_LIST.from}>`,
      to: EMAIL_LIST.to,
      subject: SUBJECT,
      react: TeaserEmail({email}),
    })

    if (emailError) {
      console.error('Error sending email:', emailError)
      return NextResponse.json({message: 'Email sending failed', error: emailError}, {status: 400})
    }

    console.log('Email sent successfully:', email)

    // Add to audience
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!audienceId) {
      console.error('Internal Server Error: RESEND_AUDIENCE_ID is not set')
      return NextResponse.json({error: 'Audience ID is missing'}, {status: 500})
    }

    const {data: contactData, error: contactError} = await resend.contacts.create({
      email,
      audienceId,
    })

    if (contactError) {
      console.error('Error adding to audience:', contactError)
      return NextResponse.json({message: 'Failed to add to audience', error: contactError}, {status: 400})
    }

    console.log('Email added to audience successfully:', contactData)

    return NextResponse.json({message: 'Email sent and added to audience successfully', emailData, contactData}, {status: 200})
  } catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({message: 'Failed to process request', error}, {status: 500})
  }
}
