import type {Note} from '@api/session/route'
import {supabase} from '@/lib/supabase'

export type Session = {
  id: string
  favicon: string | null
  url: string
  title: string
  created_at: string
  note: Note
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
    const {data, error} = await supabase
      .from('sessions')
      .select('*')
      .limit(5000) // updated in settings
      .order('created_at', {ascending: false})

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
    // Try simple query first without pagination to diagnose the issue
    const {data, error} = await supabase
      .from('users')
      .select('*')
      .limit(1000) // default limit
      .order('updated_at', {ascending: false})

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
