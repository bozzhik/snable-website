import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Explore the latest updates, fixes, and new features in Snable. Stay informed about version history and improvements.',
}

import {PROJECT_LINKS} from '@/lib/constants'
import {SquareCode} from 'lucide-react'

import Container from '~/Global/Container'
import Button from '~/UI/Button'

export default function ChangelogPage() {
  return (
    <Container variant="compact" className="space-y-6 sm:space-y-8">
      <Button to={PROJECT_LINKS.github} size="small" icon={<SquareCode strokeWidth={1.5} />} className="w-full !px-0 gap-1.5" text="Source code" target="_blank" />

      <section data-section="content-changelog" className="space-y-4">
        {[1, 2, 3].map((item, idx) => (
          <mark key={idx}>{item}</mark>
        ))}
      </section>
    </Container>
  )
}
