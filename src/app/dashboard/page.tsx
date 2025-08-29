import {Metadata} from 'next'

import {getSessions, getUsers} from '@/utils/getDashboard'

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
    <main className="relative w-full">
      <div className="p-2 bg-gray rounded-lg">{JSON.stringify({sessions, users}, null, 2)}</div>
    </main>
  )
}
