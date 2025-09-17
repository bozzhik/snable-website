import {supabase} from '@/lib/supabase'

export type Session = {
  id: string
  favicon: string | null
  url: string
  title: string
  created_at: string
  pin: boolean | null
  note: string | null
}

export type User = {
  token: string
  figma_bridge: {urls?: string[]} | null
  figma_bridge_count: number | null
  snabled: string[]
  favorites: string[]
  created_at: string
  updated_at: string
  mark: string | null
  figma_plugin: {urls?: string[]} | null
  figma_plugin_count: number | null
}

export async function getSessions(): Promise<Session[] | null> {
  try {
    // Use pagination to get all sessions, as Supabase has default limits
    let allSessions: Session[] = []
    let from = 0
    const pageSize = 1000

    while (true) {
      const {data, error} = await supabase
        .from('sessions')
        .select('*')
        .order('created_at', {ascending: false})
        .range(from, from + pageSize - 1)

      if (error) {
        console.error('Error fetching sessions:', error)
        return null
      }

      if (!data || data.length === 0) {
        break
      }

      allSessions = allSessions.concat(data)

      // If we got less than pageSize, we've reached the end
      if (data.length < pageSize) {
        break
      }

      from += pageSize
    }

    // console.log(`Loaded ${allSessions.length} sessions from Supabase`)
    return allSessions
  } catch (error) {
    console.error('Error in getSessions:', error)
    return null
  }
}

export async function getUsers(): Promise<User[] | null> {
  try {
    // Use pagination to get all users, as Supabase has default limits
    let allUsers: User[] = []
    let from = 0
    const pageSize = 1000

    while (true) {
      const {data, error} = await supabase
        .from('users')
        .select('*')
        .order('updated_at', {ascending: false})
        .range(from, from + pageSize - 1)

      if (error) {
        console.error('Error fetching users:', error)
        return null
      }

      if (!data || data.length === 0) {
        break
      }

      allUsers = allUsers.concat(data)

      // If we got less than pageSize, we've reached the end
      if (data.length < pageSize) {
        break
      }

      from += pageSize
    }

    // console.log(`Loaded ${allUsers.length} users from Supabase`)
    return allUsers
  } catch (error) {
    console.error('Error in getUsers:', error)
    return null
  }
}
