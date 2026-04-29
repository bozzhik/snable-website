'use server'

import {PROJECT_LINKS} from '@/lib/constants'
import axios from 'axios'

const TIMEOUT_MS = 15_000
const CACHE_CONTROL = 'public, max-age=86400'

// One UA everywhere unless a site proves picky.
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'

const BASE_HEADERS = {
  'Cache-Control': CACHE_CONTROL,
  'User-Agent': USER_AGENT,
} as const

export type FigmaPluginStats = {
  plugin_id: string
  users: number
  unique_runs: number
  views: number
  likes: number
  comments: number
}

type FigmaVersionsResponse = {
  meta?: {
    plugin?: {
      id?: string | number
      install_count?: unknown
      unique_run_count?: unknown
      view_count?: unknown
      like_count?: unknown
      comment_count?: unknown
    }
  }
}

const FIGMA_PLUGIN_ID = '1507707678099986490'

const DEFAULT_FIGMA_STATS: FigmaPluginStats = {
  plugin_id: FIGMA_PLUGIN_ID,
  users: 0,
  unique_runs: 0,
  views: 0,
  likes: 0,
  comments: 0,
}

function toInt(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.trunc(value)
  if (typeof value === 'string') {
    const n = Number.parseInt(value, 10)
    return Number.isFinite(n) ? n : 0
  }
  return 0
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asFigmaVersionsResponse(value: unknown): FigmaVersionsResponse | null {
  if (!isObject(value)) return null
  const meta = value.meta
  if (meta !== undefined && !isObject(meta)) return null
  const plugin = isObject(meta) ? meta.plugin : undefined
  if (plugin !== undefined && !isObject(plugin)) return null
  return value as FigmaVersionsResponse
}

function withTimeoutSignal(ms: number): {signal: AbortSignal; cancel: () => void} {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), ms)
  return {
    signal: controller.signal,
    cancel: () => clearTimeout(id),
  }
}

async function fetchFigmaPluginStats(pluginId = FIGMA_PLUGIN_ID): Promise<FigmaPluginStats> {
  const {signal, cancel} = withTimeoutSignal(TIMEOUT_MS)
  try {
    const res = await fetch(`https://www.figma.com/api/plugins/${pluginId}/versions`, {
      headers: {
        ...BASE_HEADERS,
        Accept: 'application/json,text/plain,*/*',
        Referer: PROJECT_LINKS.figma_plugin,
      },
      next: {revalidate: 60 * 60},
      signal,
    })

    if (!res.ok) {
      console.error('Failed to fetch Figma plugin stats:', res.status, res.statusText)
      return {...DEFAULT_FIGMA_STATS, plugin_id: pluginId}
    }

    const json: unknown = await res.json()
    const data = asFigmaVersionsResponse(json)
    const plugin = data?.meta?.plugin

    if (!plugin || typeof plugin !== 'object') {
      console.error('Unexpected Figma response shape: missing meta.plugin')
      return {...DEFAULT_FIGMA_STATS, plugin_id: pluginId}
    }

    return {
      plugin_id: String(plugin.id ?? pluginId),
      users: toInt(plugin.install_count),
      unique_runs: toInt(plugin.unique_run_count),
      views: toInt(plugin.view_count),
      likes: toInt(plugin.like_count),
      comments: toInt(plugin.comment_count),
    }
  } catch (err) {
    console.error('Error fetching Figma plugin stats:', err)
    return {...DEFAULT_FIGMA_STATS, plugin_id: pluginId}
  } finally {
    cancel()
  }
}

export type Consumers = {
  extension: number
  plugin: FigmaPluginStats
}

export async function fetchConsumers(source: 'all' | 'extension' | 'plugin'): Promise<Consumers> {
  try {
    let extensionCount = 0
    let pluginStats: FigmaPluginStats = DEFAULT_FIGMA_STATS

    if (source === 'all' || source === 'extension') {
      try {
        const extensionResponse = await axios.get(PROJECT_LINKS.extension, {
          headers: BASE_HEADERS,
          timeout: TIMEOUT_MS,
        })

        const extensionMatch = extensionResponse.data.match(/(\d+)\s*users/)
        extensionCount = extensionMatch ? parseInt(extensionMatch[1]) : 0
      } catch (error) {
        console.error('Error fetching extension data:', error)
      }
    }

    if (source === 'all' || source === 'plugin') {
      try {
        pluginStats = await fetchFigmaPluginStats()
      } catch (error) {
        console.error('Error fetching plugin data:', error)
      }
    }

    return {
      extension: extensionCount,
      plugin: pluginStats,
    }
  } catch (error) {
    console.error('Error in fetchConsumers:', error)
    return {
      extension: 0,
      plugin: DEFAULT_FIGMA_STATS,
    }
  }
}
