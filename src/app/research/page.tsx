import {MDXRemote} from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Research</h1>
      <div className="prose prose-lg">
        <MDXRemote source={content} />
      </div>
    </div>
  )
}

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  const content = await fs.promises.readFile(filePath, 'utf8')
  return content
}
