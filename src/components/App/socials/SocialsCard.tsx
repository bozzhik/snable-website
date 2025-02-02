import {type SocialsItem} from '@/app/socials/storage'
import {BUTTON_VARIANTS} from '~/UI/Button'

import {cn} from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'

export default function SocialsCard({item}: {item: SocialsItem}) {
  const {source, link, title, content, image, video} = item

  return (
    <Link href={link} className={cn(BUTTON_VARIANTS.outline, 'bg-black-card border rounded-lg duration-300', 'block p-5 space-y-3.5 group')} target="_blank">
      <div className="font-mono text-sm font-medium uppercase text-gray">{source}</div>

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
          {title && <h2>{title}</h2>}

          {content?.map((unit, idx) => (
            <p className="text-white-dirty !leading-[1.4] lowercase" key={idx}>
              {unit}
            </p>
          ))}
        </div>
      </div>
    </Link>
  )
}
