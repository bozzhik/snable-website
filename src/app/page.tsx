export const dynamic = 'auto'
export const revalidate = 43200 // 12 hours

import Container from '~/Global/Container'

import Hero from '~~/index/Hero'
import Snabled from '~~/index/Snabled'
import Achievements from '~~/index/Achievements'
import Teaser from '~~/teaser/Launch'

export default function IndexPage() {
  return (
    <Container variant="default" className="space-y-36 pb-40 sm:pt-0">
      <Hero />
      <Snabled />

      <Achievements />
      <Teaser />
    </Container>
  )
}
