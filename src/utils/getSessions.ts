import type {TabInfo} from '@api/session/route'
import type {PostgrestError} from '@supabase/supabase-js'

import {supabase} from '@/lib/supabase'
// import {isSuspiciousDomain} from '@/utils/filterSessions'

export async function getSessions(options?: {delay?: boolean}) {
  let query = supabase
    .from('sessions') // tab data
    .select('*')
    .order('created_at', {ascending: false})
    .limit(30)

  // Если delay = true, исключаем сессии за последние 24 часа
  if (options?.delay) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    query = query.lt('created_at', twentyFourHoursAgo)
  }

  const {data: sessions, error} = (await query) as {data: TabInfo[] | null; error: PostgrestError | null}

  if (error || !sessions?.length) {
    return null
  }

  const filteredSessions = sessions
    .filter((session) => session.note !== 'DANGER' && session.note !== 'SKIP' && session.note !== 'DUPLICATE')

    .filter((session, index, self) => {
      const domain = new URL(session.url).hostname
      return index === self.findIndex((s) => new URL(s.url).hostname === domain)
    })
    .slice(0, 15)

  return filteredSessions
}
