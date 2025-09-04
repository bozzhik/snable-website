export const metadata = {
  title: 'Research',
  description: 'Exploring the potential of Chrome extensions to analyse visual data from websites as part of Snable Extension development',
}

import path from 'path'
import fs from 'fs/promises'

import {unstable_cacheLife as cacheLife} from 'next/cache'

import ScrollProgress from '~~/research/ScrollProgress'
import Content from '~~/research/Content'

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content-en.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function ResearchPage() {
  'use cache'

  cacheLife({
    revalidate: 144000, // 40 hours
    expire: 172800, // 48 hours
  })

  const content = await getContent()

  return (
    <>
      <ScrollProgress />

      <Content data={content} />
    </>
  )
}
