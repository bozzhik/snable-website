import Container from '~/Global/Container'

import Hero from '~~/index/Hero'
import Snabled from '~~/index/Snabled'
import Achievements from '~~/index/Achievements'

export default function IndexPage() {
  return (
    <Container variant="default" className="space-y-36 sm:pt-0">
      <Hero />
      <Snabled />

      <Achievements />
    </Container>
  )
}
