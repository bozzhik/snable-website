import heroImage from '$/hero.png'

import Image from 'next/image'
import {H1, P} from '~/UI/Typography'

const heroContent = {
  title: 'Snable Extension',
  subtitle: 'Chrome extension that simplifies the process of collecting visual elements from websites',
  image: heroImage,
}

export default function Hero() {
  return (
    <section data-section="hero-index" className="space-y-12">
      <div className="flex flex-col gap-3 items-center text-center">
        <H1>{heroContent.title}</H1>
        <P className="max-w-[50ch]">{heroContent.subtitle}</P>
      </div>

      <div className="group bg-black-light border-2 border-gray-dark rounded-[20px]">
        <Image priority={true} quality={100} className="group-hover:scale-[1.02] duration-500" src={heroImage} alt="Snable Chrome Extension overview" />
      </div>
    </section>
  )
}
