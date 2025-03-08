import {PROJECT_LINKS} from '@/lib/constants'
import axios from 'axios'

import {H4} from '~/UI/Typography'

async function getUserCount() {
  try {
    const response = await axios.get(PROJECT_LINKS.store, {
      headers: {'Cache-Control': 'public, max-age=86400'},
    })

    const match = response.data.match(/(\d+)\s*users/)
    return match ? parseInt(match[1]) : 0
  } catch (error) {
    console.error('Error fetching user count:', error)
    throw error
  }
}

export default async function UsersCounter() {
  try {
    const userCount = await getUserCount()

    return (
      <section className="text-center">
        <H4>
          Users Count: <span className="text-gray">{userCount}</span>
        </H4>
      </section>
    )
  } catch {
    return <H4>Failed to fetch user count</H4>
  }
}
