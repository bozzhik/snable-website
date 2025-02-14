import XIcon from '$/socials/x.svg'
import XLightIcon from '$/socials/x-light.svg'
import MediumIcon from '$/socials/medium.svg'
import MediumLightIcon from '$/socials/medium-light.svg'
import TelegramIcon from '$/socials/telegram.svg'
import TelegramLightIcon from '$/socials/telegram-light.svg'
import HabrIcon from '$/socials/habr.svg'
import HabrLightIcon from '$/socials/habr-light.svg'

import type {SocialSource} from '@/app/socials/storage'

import {cn} from '@/lib/utils'
import Image, {type StaticImageData} from 'next/image'

const icons: Record<SocialSource, {dark: StaticImageData; light: StaticImageData}> = {
  medium: {dark: MediumIcon, light: MediumLightIcon},
  telegram: {dark: TelegramIcon, light: TelegramLightIcon},
  habr: {dark: HabrIcon, light: HabrLightIcon},
  x: {dark: XIcon, light: XLightIcon},
}

type Props = {
  source: SocialSource
  mode?: 'dark' | 'light'
  className?: string
}

export default function SocialsIcon({source, mode = 'dark', className}: Props) {
  const icon = icons[source]?.[mode]
  if (!icon) return null

  return (
    <div className={cn('grid place-items-center size-5 sm:size-6', className)}>
      <Image src={icon} alt={source} />
    </div>
  )
}
