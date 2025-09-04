export const metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

import {unstable_cacheLife as cacheLife} from 'next/cache'

import {getSessions, getUsers} from '@/utils/getDashboard'

import {Suspense} from 'react'

import Container from '~/Global/Container'
import {Board} from '~~/dashboard/Board'

export default async function DashboardPage() {
  'use cache'

  cacheLife('minutes')

  const [sessionsData, usersData] = await Promise.all([
    getSessions().catch((err) => {
      console.error('Sessions failed:', err)
      return []
    }),
    getUsers().catch((err) => {
      console.error('Users failed:', err)
      return []
    }),
  ])

  const sessions = sessionsData || []
  const users = usersData || []

  return (
    <Container variant="compact">
      <Suspense
        fallback={
          <section data-section="dashboard-skeleton" className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-dark min-h-14 w-full rounded-lg" />
            ))}
          </section>
        }
      >
        <Board sessions={sessions} users={users} />
      </Suspense>
    </Container>
  )
}
