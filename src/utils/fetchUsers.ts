import {PROJECT_LINKS} from '@/lib/constants'
import axios from 'axios'

export async function fetchUsers() {
  try {
    const response = await axios.get(PROJECT_LINKS.extension, {
      headers: {'Cache-Control': 'public, max-age=86400'},
    })

    const match = response.data.match(/(\d+)\s*users/)
    return match ? parseInt(match[1]) : 0
  } catch (error) {
    console.error('Error fetching user count:', error)
    throw error
  }
}
