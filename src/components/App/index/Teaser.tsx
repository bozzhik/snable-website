import {MINI_BLOCK} from '~/Global/Container'
import {Users} from 'lucide-react'

import {cn} from '@/lib/utils'
import {H4} from '~/UI/Typography'
import Button from '~/UI/Button'
import TeaserForm from '~~/index/TeaserForm'

export default function Teaser() {
  return (
    <section id="form" data-section="teaser-index" className={cn(MINI_BLOCK, 'pt-20 pb-40 sm:pt-28', 'flex flex-col items-center justify-center gap-3 xl:gap-2.5')}>
      <div className="space-y-2.5 sm:space-y-6 w-full">
        <H4 className="text-lg text-center xl:text-base sm:px-14">Don&#39;t miss our launch! Get updates, no spam.</H4>

        <TeaserForm />
      </div>

      <Button to="/socials" className="w-full border-gray-medium" icon={<Users />} variant="outline" text="Follow Us" />
    </section>
  )
}
