'use server'

import {PROJECT_LINKS} from '@/lib/constants'
import axios from 'axios'

const HEADERS = {
  'Cache-Control': 'public, max-age=86400',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 15_6_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
}
const TIMEOUT = 15000

export type Consumers = {
  extension: number
  plugin: number
}

export async function fetchConsumers(source: 'all' | 'extension' | 'plugin'): Promise<Consumers> {
  try {
    let extensionCount = 0
    let pluginCount = 0

    if (source === 'all' || source === 'extension') {
      try {
        const extensionResponse = await axios.get(PROJECT_LINKS.extension, {
          headers: HEADERS,
          timeout: TIMEOUT,
        })

        const extensionMatch = extensionResponse.data.match(/(\d+)\s*users/)
        extensionCount = extensionMatch ? parseInt(extensionMatch[1]) : 0
      } catch (error) {
        console.error('Error fetching extension data:', error)
      }
    }

    if (source === 'all' || source === 'plugin') {
      try {
        const pluginResponse = await axios.get(PROJECT_LINKS.figma_plugin_stats, {
          headers: HEADERS,
          timeout: TIMEOUT,
        })

        const figmaPatterns = [/id="unique_runs-btn"[^>]*>[\s\S]*?<p[^>]*class="[^"]*text-h4[^"]*"[^>]*>(\d+)<\/p>/i, /Users<\/p><p[^>]*class="[^"]*text-h4[^"]*"[^>]*>(\d+)<\/p>/i, /<p[^>]*class="[^"]*text-h4[^"]*"[^>]*>(\d+)<\/p>/i, /(\d+)\s*users?/i]

        for (const pattern of figmaPatterns) {
          const match = pluginResponse.data.match(pattern)
          if (match) {
            pluginCount = parseInt(match[1])
            break
          }
        }
      } catch (error) {
        console.error('Error fetching plugin data:', error)
      }
    }

    return {
      extension: extensionCount,
      plugin: pluginCount,
    }
  } catch (error) {
    console.error('Error in fetchConsumers:', error)
    return {
      extension: 0,
      plugin: 0,
    }
  }
}
