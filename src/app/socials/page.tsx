import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Socials',
  description: 'Stay connected with Snable. We publish developer insights, research, and discussions. Find all our links to Habr, Telegram, and Medium in one place.',
}

import {LINKS, ITEMS, type SocialSource} from '@/app/socials/storage'

import Container from '~/Global/Container'
import Button from '~/UI/Button'
import SocialsCard from '~~/socials/SocialsCard'
import SocialsIcon from '~~/socials/SocialsIcon'

export default function SocialsPage() {
  return (
    <Container variant="compact" className="space-y-6 sm:space-y-8">
      <section data-section="socials-nav" className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-1.5">
        {Object.entries(LINKS).map(([key, url]) => (
          <Button to={url} size="small" className="w-full !px-0 gap-1.5" text={key !== 'x' ? key : undefined} icon={<SocialsIcon source={key as SocialSource} />} target="_blank" key={key} />
        ))}
      </section>

      <section data-section="socials-grid" className="space-y-4">
        {ITEMS.map((item, idx) => (
          <SocialsCard item={item} key={idx} />
        ))}
      </section>
    </Container>
  )
}
