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
    const {data, error} = await supabase.from('sessions').select('*').order('created_at', {ascending: false})

    if (error) {
      console.error('Error fetching sessions:', error)
      return null
    }

    return data || []
  } catch (error) {
    console.error('Error in getSessions:', error)
    return null
  }
}

export async function getUsers(): Promise<User[] | null> {
  try {
    const {data, error} = await supabase.from('users').select('*').order('updated_at', {ascending: false})

    if (error) {
      console.error('Error fetching users:', error)
      return null
    }

    return data || []
  } catch (error) {
    console.error('Error in getUsers:', error)
    return null
  }
}
