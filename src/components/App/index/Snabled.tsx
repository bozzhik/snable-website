import type {TabInfo} from '@/app/api/session/route'
import type {PostgrestError} from '@supabase/supabase-js'

import {supabase} from '@/lib/supabase'
import {cn, cleanUrl} from '@/lib/utils'

import {H5, P} from '~/UI/Typography'
import {Marquee} from '~/Modules/Marque'

export default async function Snabled() {
  const {data: sessions, error} = (await supabase
    .from('sessions') // tab data
    .select('*')
    .order('pin', {ascending: true}) // cool sessions
    .order('created_at', {ascending: false})
    .limit(15)) as {data: TabInfo[] | null; error: PostgrestError | null}

  if (error || !sessions?.length) {
    return null
  }

  return (
    <section data-section="snabled-index" className={cn('mt-24')}>
      <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] [--gap:0.75rem]">
          {sessions.map((tab) => (
            <a href={tab.url} className={cn('min-w-64', 'group p-2 pr-2.5 flex items-center gap-2.5', 'bg-black-light border border-gray-medium rounded-xl', 'duration-300 hover:bg-black hover:border-gray-medium/70')} target="_blank" rel="noopener noreferrer" key={tab.url}>
              {tab.favicon && (
                <div className={cn('size-11 grid place-items-center rounded-lg overflow-hidden', 'relative flex-shrink-0')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="object-contain object-center rounded-sm" src={tab.favicon} alt={tab.title} />
                </div>
              )}

              <div className="flex-grow min-w-0">
                <H5 className="mt-0.5 leading-[1.2] duration-300 group-hover:text-gray line-clamp-1">{tab.title.slice(0, 20)}</H5>
                <P className="font-mono text-xs truncate text-gray">{cleanUrl(tab.url.slice(0, 40))}</P>
              </div>
            </a>
          ))}
        </Marquee>

        <div className="absolute inset-y-0 left-0 w-[25%] pointer-events-none bg-gradient-to-r from-black via-gray-dark/40"></div>
        <div className="absolute inset-y-0 right-0 w-[25%] pointer-events-none bg-gradient-to-l from-black via-gray-dark/40"></div>
      </div>
    </section>
  )
}
