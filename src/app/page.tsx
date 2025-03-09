import Container from '~/Global/Container'

import Hero from '~~/index/Hero'
import Snabled from '~~/index/Snabled'

export default function IndexPage() {
  return (
    <Container variant="default" className="space-y-36 sm:space-y-44 sm:pt-0">
      <Hero />
      <Snabled />
    </Container>
  )
}
