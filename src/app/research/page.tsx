import PagingGif from '$/paging.gif'

import path from 'path'
import fs from 'fs/promises'

import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'

import Image from 'next/image'
import Link from 'next/link'
import {MDX} from '~/UI/MDX'
import ScrollProgress from '~~/research/ScrollProgress'
import AnchorLinks from '~~/research/AnchorLinks'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Exploring the potential of Chrome extensions to analyse visual data from websites as part of Snable Extension development',
}

async function getContent() {
  const filePath = path.join(process.cwd(), 'src/app/research/content.mdx')
  return await fs.readFile(filePath, 'utf8')
}

export default async function ResearchPage() {
  const content = await getContent()

  return (
    <>
      <ScrollProgress />

      <div className="max-w-2xl pt-12 pb-16 mx-auto space-y-4 sm:mx-3 sm:max-w-none">
        <h1 className="font-medium tracking-tight uppercase text-neutral-300">Snable Extension — Research</h1>

        <main className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tighter leading-[1.15] sm:text-2xl text-neutral-500">Исследование возможностей Сhrome-расширений для анализа визуальных данных веб-сайтов</h1>
            <AnchorLinks />
          </div>

          <Link className="relative block mb-8 overflow-hidden group" href="https://hsedesign.ru/project/82da0ce3a8364a71a6537ec07ae42f16" target="_blank">
            <Image src={PagingGif} className="duration-300 rounded-lg bg-neutral-700 group-hover:opacity-50" alt="Книга Snable (Page Inspector Extension)" />

            <div className="absolute bottom-0 left-0 grid w-full h-16 duration-300 ease-in-out translate-y-14 place-items-center group-hover:translate-y-0">
              <div className="px-3 py-0.5 pb-1 text-lg font-medium rounded bg-foreground text-neutral-700">Открыть проект</div>
            </div>
          </Link>

          <MDXRemote source={content} components={MDX} />
        </main>
      </div>
    </>
  )
}
