import XIcon from '$/socials/x.svg'
import MediumIcon from '$/socials/medium.svg'
import TelegramIcon from '$/socials/telegram.svg'
import HabrIcon from '$/socials/habr.svg'

import type {SocialSource} from '@/app/socials/storage'
import Image, {type StaticImageData} from 'next/image'

const icons: Record<SocialSource, StaticImageData> = {
  medium: MediumIcon,
  telegram: TelegramIcon,
  habr: HabrIcon,
  x: XIcon,
}

export default function SocialsIcon({source}: {source: SocialSource}) {
  const icon = icons[source]
  if (!icon) return null

  return (
    <div className="grid place-items-center size-5">
      <Image src={icon} alt={source} />
    </div>
  )
}
