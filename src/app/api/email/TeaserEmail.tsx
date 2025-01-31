import {Body, Button, Container, Head, Heading, Hr, Html, Img, Preview, Section, Text, Tailwind} from '@react-email/components'
import * as React from 'react'

const AUDIENCE_URL = process.env.RESEND_AUDIENCE_ID ? `https://resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}` : ''

export const SUBJECT = 'New audience member'

export type FormFields = {
  email: string
}

export const TeaserEmail = ({email}: FormFields) => {
  const previewText = `${email} was added to Audience`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="px-2 mx-auto my-auto font-sans bg-white">
          <Container className="border border-solid border-[#eaeaea] rounded-sm my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img src="https://snable.website/logo.png" width="40" height="40" alt="Snable Chrome Extension" className="mx-auto my-0" />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 mt-[30px] mb-[20px] mx-0">
              <strong>{email}</strong> was added to Audience
            </Heading>
            <Section className="text-center">
              <Button className="bg-[#000000] rounded-sm text-white text-[12px] font-semibold no-underline text-center w-full py-3" href={AUDIENCE_URL}>
                Open Audience
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
            <Text className="text-black text-[12px] leading-none text-center m-0">{email}</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

TeaserEmail.PreviewProps = {
  email: 'bozzhik@gmail.com',
} as FormFields

export default TeaserEmail
