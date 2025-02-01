import {type SocialsItem} from '@/app/socials/storage'
import {BUTTON_VARIANTS} from '~/UI/Button'

import {cn} from '@/lib/utils'
import Link from 'next/link'

export default function SocialsCard({item}: {item: SocialsItem}) {
  const {source, link, content} = item

  return (
    <Link href={link} className={cn('block p-5 space-y-3 border rounded-lg duration-300', BUTTON_VARIANTS.outline)} target="_blank">
      <div className="font-mono text-sm font-medium uppercase text-gray">{source}</div>

      <div className="space-y-2">
        {content?.map((unit, idx) => (
          <p key={idx} className="text-white-dirty !leading-[1.4]">
            {unit}
          </p>
        ))}
      </div>
    </Link>
  )
}
