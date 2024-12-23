import path from 'path'
import fs from 'fs/promises'

import {MDXRemote} from 'next-mdx-remote/rsc'
import {MDX} from '~/UI/MDX'

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <div className="max-w-2xl pt-8 pb-16 mx-auto sm:mx-3 sm:max-w-none space-y-14">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight uppercase">Snable Extension</h1>
        <div className="px-1 text-sm text-white rounded-sm bg-neutral-700 w-fit">Research</div>
      </div>

      <main>
        <MDXRemote source={content} components={MDX} />
      </main>
    </div>
  )
}
