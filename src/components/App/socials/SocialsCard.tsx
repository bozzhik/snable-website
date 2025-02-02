import {type SocialsItem} from '@/app/socials/storage'
import {BUTTON_VARIANTS} from '~/UI/Button'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {H2, P} from '~/UI/Typography'

export default function SocialsCard({item}: {item: SocialsItem}) {
  const {source, link, title, content, image, video} = item

  return (
    <Link href={link} className={cn(BUTTON_VARIANTS.outline, 'block p-5 sm:p-4 space-y-3.5 group', 'border rounded-lg duration-300 bg-black-card hover:bg-gray-dark')} target="_blank">
      <div className="font-mono text-sm sm:text-base font-medium uppercase text-gray">{source}</div>

      <div className="space-y-4">
        {(image || video) && (
          <div className="overflow-hidden rounded-md bg-gray-dark">
            {image ? (
              <Image quality={100} className={cn('duration-300 group-hover:scale-[1.015]', 'w-full object-contain')} src={image} width={1000} height={1000} alt={`Snable ${source}`} />
            ) : (
              <video autoPlay muted loop className={cn('duration-300 group-hover:scale-[1.015]', 'w-full')}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        )}

        <div className="space-y-2">
          {title && <H2 className="!mt-4 xl:!mt-5 mb-3 sm:mb-2 max-w-[29ch] sm:max-w-[18ch]">{title}</H2>}

          {content?.map((unit, idx) => <P key={idx}>{unit}</P>)}
        </div>
      </div>
    </Link>
  )
}
