import PagingGif from '$/paging.gif'

import path from 'path'
import fs from 'fs/promises'
import {m} from '@/lib/utils'

import {Metadata} from 'next'
import {MDXRemote} from 'next-mdx-remote/rsc'

import Image from 'next/image'
import Link from 'next/link'
import {MDX} from '~/UI/MDX'
import Button from '~/UI/Button'
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

      <div className={m('pt-32 xl:pt-28 sm:pt-24 pb-16 sm:mx-2.5', 'max-w-2xl sm:max-w-none mx-auto space-y-3 xl:space-y-2.5')}>
        <h1 className="text-sm font-medium tracking-tight uppercase text-neutral-300">Snable Chrome Extension — Research</h1>

        <main className="space-y-6">
          <div className="space-y-4 sm:space-y-3">
            <h1 className="text-3xl font-semibold tracking-tighter !leading-[1.15] sm:text-2xl text-neutral-500">Исследование возможностей Сhrome-расширений для анализа визуальных данных веб-сайтов</h1>
            <AnchorLinks />
          </div>

          <Link className="relative block mb-8 overflow-hidden group" href="https://hsedesign.ru/project/82da0ce3a8364a71a6537ec07ae42f16" target="_blank">
            <Image src={PagingGif} className="duration-300 rounded-lg bg-neutral-700 group-hover:opacity-50" alt="Книга Snable (Page Inspector Extension)" />

            <div className="absolute bottom-0 left-0 grid w-full h-16 duration-300 ease-in-out sm:pt-2.5 sm:h-fit sm:static translate-y-14 place-items-center group-hover:-translate-y-0.5 sm:translate-y-0">
              <Button className="py-2.5 sm:w-full" size="small" text="Открыть проект" />
            </div>
          </Link>

          <article>
            <MDXRemote source={content} components={MDX} />
          </article>
        </main>
      </div>
    </>
  )
}
