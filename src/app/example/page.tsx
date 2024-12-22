import path from 'path'
import fs from 'fs/promises'

import {MDXRemote} from 'next-mdx-remote/rsc'
import components from './components'

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/example/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function Home() {
  const content = await getContent()

  return (
    <div className="container px-4 py-8 mx-auto max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  )
}
