import heroImage from '$/hero.png'

import Image from 'next/image'

export default function Hero() {
  return (
    <section data-section="hero-index" className="space-y-12">
      <div className="flex flex-col gap-3 items-center text-center">
        <h1 className="text-gray text-[80px] leading-none font-semibold tracking-tighter">Snable Extension</h1>
        <p className="font-mono uppercase text-white-dirty max-w-[50ch]">Chrome extension that simplifies the process of collecting visual elements from websites.</p>
      </div>

      <div className="group bg-black-light border-2 border-gray-dark rounded-[20px]">
        <Image priority={true} quality={100} className="size-full object-cover group-hover:scale-[1.02] duration-500" src={heroImage} alt="Snable Chrome Extension overview" />
      </div>
    </section>
  )
}
