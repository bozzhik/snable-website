import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Socials',
  description: 'Stay connected with Snable. We publish developer insights, research, and discussions. Find all our links to Habr, Telegram, and Medium in one place.',
}

import Container from '~/Global/Container'

export default function SocialsPage() {
  return (
    <Container>
      snable.website by bozzhik
    </Container>
  )
}
