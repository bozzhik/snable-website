import type {TabInfo} from '@/app/api/session/route'
import type {PostgrestError} from '@supabase/supabase-js'

import {supabase} from '@/lib/supabase'

import {H4} from '~/UI/Typography'

const cleanUrl = (url: string) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default async function Sessions() {
  const {data: sessions, error} = (await supabase
    .from('sessions') // tab data
    .select('*')
    .order('created_at', {ascending: false})
    .limit(10)) as {data: TabInfo[] | null; error: PostgrestError | null}

  if (error || !sessions?.length) {
    return null
  }

  return (
    <section className="w-full space-y-4">
      <H4 className="text-center">Recent Sessions</H4>

      <div className="flex justify-center gap-3 ssm:gap-2">
        {sessions.map((session, index) => (
          <a key={index} href={session.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 p-3 rounded-lg bg-black-card border border-gray-light/20 hover:border-gray-light/30 transition-colors duration-200">
            {session.favicon && (
              <div className="relative w-6 h-6 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="object-contain rounded-sm" src={session.favicon} alt={session.title} />
              </div>
            )}

            <div className="flex-grow min-w-0">
              <h3 className="text-sm font-medium truncate group-hover:text-white transition-colors duration-200">{session.title}</h3>
              <p className="text-xs text-gray truncate">{cleanUrl(session.url.slice(0, 45))}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
