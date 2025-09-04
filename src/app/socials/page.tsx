export const metadata = {
  title: 'Socials',
  description: 'Stay connected with Snable. We publish developer insights, research, and discussions. Find all our links to Habr, Telegram, and Medium in one place.',
}

import {ITEMS} from '@/app/socials/storage'

import Container from '~/Global/Container'
import SocialsGroup from '~~/socials/SocialsGroup'
import SocialsCard from '~~/socials/SocialsCard'

export default function SocialsPage() {
  return (
    <Container variant="compact" className="space-y-6 sm:space-y-8">
      <SocialsGroup />

      <section data-section="socials-grid" className="space-y-4">
        {ITEMS.map((item, idx) => (
          <SocialsCard item={item} key={idx} />
        ))}
      </section>
    </Container>
  )
}
