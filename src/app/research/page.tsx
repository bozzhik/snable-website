import path from 'path'
import fs from 'fs/promises'

import {Metadata} from 'next'

import ScrollProgress from '~~/research/ScrollProgress'
import Content from '~~/research/Content'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Exploring the potential of Chrome extensions to analyse visual data from websites as part of Snable Extension development',
}

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content-en.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <>
      <ScrollProgress />

      <Content data={content} />
    </>
  )
}
