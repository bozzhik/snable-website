import path from 'path'
import fs from 'fs/promises'

import {MDXRemote} from 'next-mdx-remote/rsc'
import {useMDXComponents} from './mdx-components'

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

const components = useMDXComponents({})

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <article className="">
      <MDXRemote source={content} components={components} />
    </article>
  )
}
