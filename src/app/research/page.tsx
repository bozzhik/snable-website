import {MDXRemote} from 'next-mdx-remote/rsc'
import {useMDXComponents} from './mdx-components'
import fs from 'fs/promises'
import path from 'path'

// This function will be used to read the MDX file
async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

// Define custom components outside of the async function
const components = useMDXComponents({})

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <article className="prose lg:prose-xl">
      <MDXRemote source={content} components={components} />
    </article>
  )
}
