export const metadata = {
  title: 'Dashboard',
  robots: {
    index: false,
    follow: false,
  },
}

import {getSessions, getUsers} from '@/utils/getDashboard'
import {fetchConsumers} from '@/utils/fetchConsumers'

import {Suspense} from 'react'

import Container from '~/Global/Container'
import {Board} from '~~/dashboard/Board'

export default async function DashboardPage() {
  const [sessions, users, consumers] = await Promise.all([
    getSessions()
      .catch((err) => {
        console.error('Sessions failed:', err)
        return []
      })
      .then((data) => data || []),
    getUsers()
      .catch((err) => {
        console.error('Users failed:', err)
        return []
      })
      .then((data) => data || []),
    fetchConsumers('all').catch((err) => {
      console.error('Consumers failed:', err)
      return {extension: 0, plugin: 0}
    }),
  ])

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
        <Board sessions={sessions} users={users} consumers={consumers} />
      </Suspense>
    </Container>
  )
}
