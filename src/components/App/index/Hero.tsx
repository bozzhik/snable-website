import heroImage from '$/hero.png'

import {WEBSITE_BOX} from '~/Global/Container'
import {cn} from '@/lib/utils'

import Image from 'next/image'
import {H1, P} from '~/UI/Typography'

const SCREEN_HEIGHT = 'sm:h-screen sm:!h-svh'

const heroContent = {
  title: 'Snable Extension',
  subtitle: 'Chrome extension that simplifies the process of collecting visual elements from websites',
  image: heroImage,
}

export default function Hero() {
  return (
    <section data-section="hero-index" className={cn('flex flex-col gap-12 sm:gap-8', WEBSITE_BOX, 'sm:pt-28 sm:pb-2', SCREEN_HEIGHT)}>
      <div className="flex flex-col gap-3 xl:gap-4 items-center text-center">
        <H1>{heroContent.title}</H1>
        <P className="max-w-[50ch]">{heroContent.subtitle}</P>
      </div>

      <div className="group bg-black-light border-2 border-gray-dark rounded-[20px] sm:rounded-[15px] overflow-hidden sm:h-full">
        <Image priority={true} quality={100} className="block h-full object-cover group-hover:scale-[1.02] duration-500" src={heroImage} alt="Snable Chrome Extension overview" />
      </div>
    </section>
  )
}
