import {SocialSource, type SocialsItem} from '@/app/socials/storage'
import {BUTTON_VARIANTS} from '~/UI/Button'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {H3, P} from '~/UI/Typography'
import SocialsIcon from './SocialsIcon'

export default function SocialsCard({item}: {item: SocialsItem}) {
  const {source, link, title, content, image, video} = item

  return (
    <Link href={link} className={cn(BUTTON_VARIANTS.outline, 'block p-5 xl:p-4 sm:p-3.5 space-y-3.5 group', 'rounded-lg duration-300 bg-black-card hover:bg-gray-dark', 'border border-white/20 ring-[0.5px] ring-white/20')} target="_blank">
      <div className="flex gap-1.5">
        <SocialsIcon mode="light" source={source as SocialSource} />

        <div className="font-mono text-sm sm:text-base font-medium uppercase text-gray">{source !== 'x' ? source : undefined}</div>
      </div>

      <div className="space-y-4">
        {(image || video) && (
          <div className="relative overflow-hidden rounded-md">
            <div className="relative z-20">
              {image ? (
                <Image quality={100} className={cn('duration-300 group-hover:scale-[1.015]', 'w-full object-contain')} src={image} width={1000} height={1000} alt={`Snable ${source}`} />
              ) : (
                <video autoPlay muted loop className={cn('duration-300 group-hover:scale-[1.015]', 'w-full')}>
                  <source src={video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div className="absolute inset-0 size-full bg-gray-medium animate-pulse"></div>
          </div>
        )}

        <div className="space-y-2">
          {title && <H3 className="!mt-4 xl:!mt-5 mb-3 sm:mb-2 max-w-[29ch] sm:max-w-[18ch]">{title}</H3>}

          {content?.map((unit, idx) => <P key={idx}>{unit}</P>)}
        </div>
      </div>
    </Link>
  )
}
