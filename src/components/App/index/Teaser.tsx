import {MINI_BOX} from '~/Global/Container'
import {Users} from 'lucide-react'
import {m} from '@/lib/utils'

import {P} from '~/UI/Typography'
import Button from '~/UI/Button'
import TeaserForm from './TeaserForm'

export default function Teaser() {
  return (
    <section id="form" data-section="teaser-index" className={m(MINI_BOX, 'pt-20 pb-40 sm:pt-28', 'flex flex-col items-center justify-center gap-3 xl:gap-2.5')}>
      <div className="space-y-2.5 sm:space-y-6 w-full">
        <P className="text-lg text-center xl:text-base sm:px-14">Don&#39;t miss our launch! Get updates, no spam.</P>

        <TeaserForm />
      </div>

      <Button to="/socials" className="w-full border-gray-medium" icon={<Users />} variant="outline" text="Follow Us" />
    </section>
  )
}
