import {WEBSITE_PATHS} from '@/lib/constants'

import {cn} from '@/lib/utils'
import {Users} from 'lucide-react'

import {H4} from '~/UI/Typography'
import Button from '~/UI/Button'
import TeaserForm from '~~/teaser/LaunchForm'

export default function Launch() {
  return (
    <section id="form" data-section="launch-teaser" className={cn('max-w-[29vw] xl:max-w-[34vw] sm:max-w-none mx-auto sm:px-2', 'flex flex-col items-center justify-center gap-3 xl:gap-2.5')}>
      <div className="space-y-3 sm:space-y-5 w-full">
        <H4 className="text-lg text-center xl:text-base sm:px-14">Don&#39;t miss our launch! Get updates, no spam.</H4>

        <TeaserForm />
      </div>

      <Button to={WEBSITE_PATHS.socials} className="w-full" icon={<Users />} variant="outline" text="Follow Us" />
    </section>
  )
}
