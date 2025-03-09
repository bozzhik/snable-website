import type {Metadata} from 'next'
import Hero from '~~/teaser/Hero'
import Teaser from '~~/teaser/Launch'

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
}

export default function TeaserPage() {
  return (
    <>
      <Hero />
      <Teaser />
    </>
  )
}
