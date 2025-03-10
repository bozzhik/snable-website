import type {TabInfo} from '@/app/api/session/route'
import type {PostgrestError} from '@supabase/supabase-js'

import {supabase} from '@/lib/supabase'
import {cn, cleanUrl} from '@/lib/utils'
import {getUsers} from '@/utils/getUsers'

import {H4, H5, P} from '~/UI/Typography'
import {Counter} from '~/UI/Counter'
import {Marquee} from '~/Modules/Marque'

export default async function Snabled() {
  const usersCount = await getUsers()

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
    <section data-section="snabled-index" className={cn('mt-24', 'space-y-6')}>
      <H4 className="max-w-[50ch] mx-auto text-white-dirty text-center">
        Apparently, these are the recently explored websites by someone from our <Counter initialValue={usersCount} className="font-semibold text-white" /> users
      </H4>

      <div className="relative flex flex-col items-center justify-center w-full overflow-hidden">
        <Marquee pauseOnHover className="[--duration:20s] [--gap:0.75rem]">
          {sessions.map((tab) => {
            const {favicon, url, title} = tab
            if (!favicon) return null

            const textGradient = 'bg-gradient-to-r to-black/0 bg-clip-text text-transparent'

            return (
              <a href={url} className={cn('min-w-64', 'group p-2 pr-2.5 flex items-center gap-2.5', 'bg-black-light border border-gray-medium rounded-[10px]', 'duration-300 hover:bg-black hover:border-gray-medium/70')} target="_blank" rel="noopener noreferrer" key={url}>
                {favicon && (
                  <div className={cn('size-11 grid place-items-center overflow-hidden', 'relative flex-shrink-0')}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="object-contain object-center rounded-sm" src={favicon} alt={title} />
                  </div>
                )}

                <div className="flex-grow min-w-0">
                  <H5 className={cn('mt-0.5 leading-[1.2] duration-300 group-hover:text-gray line-clamp-1', title.length > 20 && `from-white-dirty via-white-dirty ${textGradient}`)}>{title.slice(0, 20)}</H5>
                  <P className={cn('font-mono text-xs truncate text-gray', url.length > 40 && `from-gray via-gray ${textGradient}`)}>{cleanUrl(url.slice(0, 40))}</P>
                </div>
              </a>
            )
          })}
        </Marquee>

        <div className="absolute inset-y-0 left-0 w-[15%] pointer-events-none bg-gradient-to-r from-black via-gray-dark/40"></div>
        <div className="absolute inset-y-0 right-0 w-[15%] pointer-events-none bg-gradient-to-l from-black via-gray-dark/40"></div>
      </div>
    </section>
  )
}
