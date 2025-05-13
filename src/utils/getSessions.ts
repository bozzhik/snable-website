import type {TabInfo} from '@/app/api/session/route'
import type {PostgrestError} from '@supabase/supabase-js'

import {supabase} from '@/lib/supabase'
import {isBlockedDomain} from '@/utils/sessionFilter'

export async function getSessions() {
  const {data: sessions, error} = (await supabase
    .from('sessions') // tab data
    .select('*')
    .order('pin', {ascending: true}) // cool sessions
    .order('created_at', {ascending: false})
    .limit(30)) as {data: TabInfo[] | null; error: PostgrestError | null}

  if (error || !sessions?.length) {
    return null
  }

  const filteredSessions = sessions
    .filter((session) => !isBlockedDomain(session.url))
    .filter((session) => session.note !== 'DANGER')
    .filter((session, index, self) => {
      const domain = new URL(session.url).hostname
      return index === self.findIndex((s) => new URL(s.url).hostname === domain)
    })
    .slice(0, 15)

  return filteredSessions
}
