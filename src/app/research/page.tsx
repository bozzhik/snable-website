import PagingGif from '$/paging.gif'

import path from 'path'
import fs from 'fs/promises'

import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'
import {MDX} from '~/UI/MDX'

import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Research',
}

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <div className="max-w-2xl pt-12 pb-16 mx-auto space-y-8 sm:mx-3 sm:max-w-none">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-semibold tracking-tight uppercase">Snable Extension</h1>
        <div className="px-1 text-sm text-white rounded-sm bg-neutral-700 w-fit">Research</div>
      </div>

      <main>
        <Link className="relative block mb-6 overflow-hidden group" href="https://hsedesign.ru/project/82da0ce3a8364a71a6537ec07ae42f16" target="_blank">
          <Image src={PagingGif} className="duration-300 rounded-lg bg-neutral-700 group-hover:opacity-50" alt="Книга Snable (Page Inspector Extension)" />

          <div className="absolute bottom-0 left-0 grid w-full h-16 duration-300 ease-in-out translate-y-14 place-items-center group-hover:translate-y-0">
            <div className="px-3 py-0.5 pb-1 text-lg font-medium rounded bg-foreground text-neutral-700">Открыть проект</div>
          </div>
        </Link>

        <MDXRemote source={content} components={MDX} />
      </main>
    </div>
  )
}
