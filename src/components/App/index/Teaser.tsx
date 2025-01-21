import {MINI_BOX} from '~/Global/Container'
import {ArrowUpRight, Users} from 'lucide-react'
import {m} from '@/lib/utils'

import {P} from '~/UI/Typography'
import Button, {BUTTON_VARIANTS} from '~/UI/Button'

export default function Teaser() {
  return (
    <section id="form" data-section="teaser-index" className={m(MINI_BOX, 'pt-20 pb-40 sm:pt-28', 'flex flex-col items-center justify-center gap-3 xl:gap-2.5')}>
      <div className="space-y-2.5 sm:space-y-6 w-full">
        <P className="text-lg text-center xl:text-base sm:px-14">Don&#39;t miss our launch! Get updates, no spam.</P>

        <div className={m('w-full gap-2 p-[5px]', 'bg-black border border-gray-light/15 rounded-xl', 'group hover:border-gray-light/30 focus-within:border-gray-light/30 duration-300')}>
          <div className={m('flex gap-2 justify-between p-[5px] pl-3.5 bg-black-light border border-gray-medium rounded-lg', 'group-hover:border-white/60 hover:border-white/60 focus-within:border-white/60 duration-300')}>
            <input className={m('w-full bg-transparent text-white placeholder:text-white font-mono uppercase', '!outline-none')} placeholder="Email" />

            <button className={m(BUTTON_VARIANTS.solid, 'p-0.5 rounded-md group/button duration-300')}>
              <ArrowUpRight className="duration-500 size-10 group-hover/button:rotate-45" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>

      <Button className="w-full border-gray-medium" icon={<Users />} variant="outline" text="Follow Us" />
    </section>
  )
}
