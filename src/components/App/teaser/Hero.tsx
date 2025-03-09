import heroImage from '$/hero.png'

import {MOB_SCREEN_HEIGHT} from '~~/index/Hero'

import {cn} from '@/lib/utils'
import Image from 'next/image'
import {H1, H4} from '~/UI/Typography'

const heroContent = {
  title: 'Snable Extension',
  subtitle: 'Chrome extension that simplifies the process of collecting visual elements from websites',
  image: heroImage,
}

export default function Hero() {
  return (
    <section data-section="hero-teaser" className={cn('flex flex-col gap-12 sm:gap-10', 'sm:pt-28 sm:pb-2.5', MOB_SCREEN_HEIGHT)}>
      <div className={cn('relative z-[-20]', 'flex flex-col items-center gap-3 text-center xl:gap-4')}>
        <H1>{heroContent.title}</H1>
        <H4 className="max-w-[50ch]">{heroContent.subtitle}</H4>
      </div>

      <div className="group bg-black-light border-2 border-gray-dark rounded-[20px] sm:rounded-[15px] overflow-hidden sm:h-full">
        <Image priority={true} quality={100} className="block w-full sm:h-full object-cover group-hover:scale-[1.02] duration-500" src={heroImage} alt="Snable Chrome Extension overview" />
      </div>
    </section>
  )
}
