import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Socials',
  description: 'Stay connected with Snable. We publish developer insights, research, and discussions. Find all our links to Habr, Telegram, and Medium in one place.',
}

import {LINKS, ITEMS} from '@/app/socials/storage'

import Container from '~/Global/Container'
import Button from '~/UI/Button'
import SocialsCard from '~~/socials/SocialsCard'

export default function SocialsPage() {
  return (
    <Container variant="compact" className="space-y-8">
      <section data-section="socials-nav" className="flex gap-2">
        {Object.entries(LINKS).map(([key, url]) => (
          <Button to={url} size="small" className="w-full px-8" variant="outline" text={key} target="_blank" key={key} />
        ))}
      </section>

      <section data-section="socials-grid" className="space-y-3">
        {ITEMS.map((item, idx) => (
          <SocialsCard item={item} key={idx} />
        ))}
      </section>
    </Container>
  )
}
