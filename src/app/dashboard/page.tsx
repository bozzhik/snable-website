import type {Metadata} from 'next'

import {getSessions, getUsers} from '@/utils/getDashboard'

import Container from '~/Global/Container'
import {Board} from '~~/dashboard/Board'

export const metadata: Metadata = {
  title: 'Dashboard',

  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
}

export default async function DashboardPage() {
  const [sessionsData, usersData] = await Promise.all([getSessions(), getUsers()])

  const sessions = sessionsData || []
  const users = usersData || []

  return (
    <Container variant="compact">
      <Board sessions={sessions} users={users} />
    </Container>
  )
}
