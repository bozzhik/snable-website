import path from 'path'
import fs from 'fs/promises'

import {Metadata} from 'next'
import {unstable_cacheLife as cacheLife} from 'next/cache'
import {MDXRemote} from 'next-mdx-remote/rsc'

import ScrollProgress from '~~/research/ScrollProgress'
import Container from '~/Global/Container'
import {MDX} from '~/UI/MDX'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Snable Chrome Extension',
}

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/privacy-policy/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function PrivacyPolicyPage() {
  'use cache'

  cacheLife({
    revalidate: 144000, // 40 hours
    expire: 172800, // 48 hours
  })

  const content = await getContent()

  return (
    <>
      <ScrollProgress />

      <Container variant="compact" className="space-y-4 xl:space-y-3">
        <article>
          <MDXRemote source={content} components={MDX} />
        </article>
      </Container>
    </>
  )
}
