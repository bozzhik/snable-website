import {SOCIALS, type SocialSource} from '@/app/socials/storage'

import Button from '~/UI/Button'
import SocialsIcon from '~~/socials/SocialsIcon'

export default function SocialsGroup() {
  return (
    <section data-section="socials-nav" className="w-full grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-1.5">
      {Object.entries(SOCIALS).map(([key, url]) => (
        <Button to={url} size="small" className="w-full !px-0" text={key !== 'x' ? key : undefined} icon={<SocialsIcon source={key as SocialSource} />} target="_blank" key={key} />
      ))}
    </section>
  )
}
