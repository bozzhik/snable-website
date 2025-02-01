import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Socials',
  description: 'Stay connected with Snable. We publish developer insights, research, and discussions. Find all our links to Habr, Telegram, and Medium in one place.',
}

import {LINKS, ITEMS} from '@/app/socials/storage'
import {cn} from '@/lib/utils'

import Container from '~/Global/Container'
import Button, {BUTTON_VARIANTS} from '~/UI/Button'
import {P} from '~/UI/Typography'

export default function SocialsPage() {
  return (
    <Container variant="compact" className="space-y-8">
      <section data-section="socials-nav" className="flex gap-2">
        {Object.entries(LINKS).map(([key, url]) => (
          <Button to={url} size="small" className="px-8 w-full" variant="outline" text={key} target="_blank" key={key} />
        ))}
      </section>

      <section data-section="socials-grid" className="space-y-3">
        {ITEMS.map((post, idx) => (
          <article className={cn('p-5 space-y-2 border rounded-lg duration-300', BUTTON_VARIANTS.outline)} key={idx}>
            <P className="text-sm text-gray font-medium uppercase">{post.source}</P>

            {post.content && <P className="text-lg font-sans normal-case">{post.content}</P>}
          </article>
        ))}
      </section>
    </Container>
  )
}
