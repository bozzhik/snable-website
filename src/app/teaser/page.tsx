export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

import Container from '~/Global/Container'
import Hero from '~~/teaser/Hero'
import Teaser from '~~/teaser/Launch'

export default function TeaserPage() {
  return (
    <Container variant="default" className="space-y-36 pb-44 sm:pt-0">
      <Hero />
      <Teaser />
    </Container>
  )
}
