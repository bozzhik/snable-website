import {Metadata} from 'next'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Explore the latest updates, fixes, and new features in Snable. Stay informed about version history and improvements.',
}

import {PROJECT_LINKS} from '@/lib/constants'
import {SquareCode} from 'lucide-react'

import axios from 'axios'
import Markdown from 'marked-react'

import Container from '~/Global/Container'
import Button from '~/UI/Button'

async function getChangelog(): Promise<string> {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/bozzhik/snable/refs/heads/main/CHANGELOG.md')
    return response.data
  } catch (error) {
    console.error('Error fetching changelog:', error)
    return ''
  }
}

export default async function ChangelogPage() {
  const changelog = await getChangelog()

  const filteredChangelog = changelog
    .split('\n')
    .map((line) => line.replace(/^(\s*-\s+)[0-9a-f]{7,}:\s*/i, '$1'))
    .join('\n')

  return (
    <Container variant="compact" className="space-y-6 sm:space-y-8">
      <Button to={PROJECT_LINKS.github} size="small" icon={<SquareCode strokeWidth={1.5} />} className="w-full !px-0 gap-1.5" text="Source code" target="_blank" />

      <section data-section="content-changelog" className="space-y-3">
        <Markdown>{filteredChangelog}</Markdown>
      </section>
    </Container>
  )
}
