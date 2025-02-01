import PagingGif from '$/paging.gif'

import {MDXRemote} from 'next-mdx-remote/rsc'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import Link from 'next/link'
import Container from '~/Global/Container'
import AnchorLinks from '~~/research/AnchorLinks'
import Button from '~/UI/Button'
import {MDX} from '~/UI/MDX'

const LINKS = {
  1: {
    text: 'Snable Chrome Extension — Research',
    link: 'https://hsedesign.ru/project/82da0ce3a8364a71a6537ec07ae42f16',
  },
  2: {
    text: 'RU',
    link: 'https://github.com/bozzhik/snable-website/blob/main/src/app/research/content-ru.mdx',
  },
}

export default function Content({data}: {data: string}) {
  return (
    <Container variant="compact" className="space-y-4 xl:space-y-3">
      <div className={cn('flex justify-between', 'text-sm font-medium tracking-tight uppercase text-neutral-300')}>
        {Object.values(LINKS).map((item, index) => (
          <Link key={index} href={item.link} target="_blank" className={cn('border-b border-transparent hover:border-neutral-300 duration-200', 'hover:[text-shadow:_0_0px_2px_rgb(255_255_255_/_0.6)]')}>
            {item.text}
          </Link>
        ))}
      </div>

      <main className="space-y-6">
        <div className="space-y-4 xl:space-y-3">
          <h1 className="text-3xl font-semibold tracking-tighter leading-[1.15]! sm:text-2xl text-neutral-500 max-w-[30ch] xl:max-w-[23ch]">Exploring the Potential of Chrome Extensions for Visual Data Analysis on Websites</h1>

          <AnchorLinks />
        </div>

        <Link className="relative block mb-8 overflow-hidden group" href="https://hsedesign.ru/project/82da0ce3a8364a71a6537ec07ae42f16" target="_blank">
          <Image src={PagingGif} className="duration-300 rounded-lg bg-neutral-700 group-hover:opacity-50" alt="Книга Snable (Page Inspector Extension)" />

          <div className="absolute bottom-0 left-0 grid w-full h-16 duration-300 ease-in-out sm:pt-2.5 sm:h-fit sm:static translate-y-14 place-items-center group-hover:-translate-y-0.5 sm:translate-y-0">
            <Button className="py-2.5 sm:w-full" size="small" text="Открыть проект" />
          </div>
        </Link>

        <article>
          <MDXRemote source={data} components={MDX} />
        </article>
      </main>
    </Container>
  )
}
