import type {Session, User} from '@/utils/getDashboard'

import {cn, getTimeAgo} from '@/lib/utils'

import {H3, H5, P} from '~/UI/Typography'

export function BoardStats({sessions, users}: {sessions: Session[]; users: User[]}) {
  const stats = calculateStats(sessions, users)

  return (
    <div className="space-y-4 sm:space-y-3">
      <div className="grid grid-cols-4 sm:grid-cols-2 gap-3.5 sm:gap-2.5">
        <StatCard title="Sessions Today" value={stats.sessionsToday} description="Last 24 hours" trend={getTimeAgo(sessions[0]?.created_at || new Date().toISOString())} color="orange" />

        <StatCard title="Active Users" value={stats.activeUsers} description="Updated recently" trend={`${stats.activeUsersPercent}% this week`} color="green" />

        <StatCard title="Avg URLs per User" value={stats.avgUrlsPerUser} description="Snabled + Favorites" trend={`${stats.totalUserUrls} total URLs`} color="purple" />

        <StatCard title="Total Figma URLs" value={stats.figmaUrls} description="Figma Bridge + Plugin" trend={`${stats.figmaUsersPercent}% of users`} color="blue" />
      </div>

      <div className="bg-black-light border border-gray-medium rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <H3 className="text-white">Sessions Activity</H3>
            <P className="text-gray">Daily sessions over the last 7 days</P>
          </div>
        </div>

        <SessionsChart sessions={sessions} />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  description: string
  trend: string
  color: 'blue' | 'green' | 'purple' | 'orange'
}

function StatCard({title, value, description, trend, color}: StatCardProps) {
  const colorClasses = {
    blue: 'text-[#60a5fa]',
    green: 'text-[#4ade80]',
    purple: 'text-[#a78bfa]',
    orange: 'text-[#fb923c]',
  }

  return (
    <div className={cn('p-4 bg-black-light border border-gray-medium rounded-lg', 'hover:bg-black hover:border-gray-medium/70 transition-colors')} title={description}>
      <div className="space-y-2">
        <P className="text-gray !text-sm first-letter:uppercase">{title}</P>
        <H3 className={cn('', colorClasses[color])}>{value}</H3>

        <H5 className="!text-xs text-gray font-mono">{trend}</H5>
      </div>
    </div>
  )
}

function SessionsChart({sessions}: {sessions: Session[]}) {
  const chartData = generateChartData(sessions)
  const maxValue = Math.max(...chartData.map((d) => d.count))

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-32 gap-2">
        {chartData.map((day, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2 flex-1">
            <div className="relative w-full bg-gray-dark rounded-t">
              <div
                className="w-full bg-gray rounded-t transition-all duration-500"
                style={{
                  height: `${maxValue > 0 ? (day.count / maxValue) * 80 : 0}px`,
                  minHeight: day.count > 0 ? '4px' : '0px',
                }}
              />
            </div>
            <div className="text-center">
              <P className="text-white text-xs font-mono">{day.count}</P>
              <P className="text-gray text-xs">{day.day}</P>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function calculateStats(sessions: Session[], users: User[]) {
  const now = new Date()
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Figma URLs count
  const figmaUrls = users.reduce((total, user) => {
    const bridgeUrls = user.figma_bridge?.urls?.length || 0
    const pluginUrls = user.figma_plugin?.urls?.length || 0
    return total + bridgeUrls + pluginUrls
  }, 0)

  const figmaUsers = users.filter((user) => (user.figma_bridge?.urls?.length || 0) > 0 || (user.figma_plugin?.urls?.length || 0) > 0).length

  const figmaUsersPercent = users.length > 0 ? Math.round((figmaUsers / users.length) * 100) : 0

  // Active users (updated in last week)
  const activeUsers = users.filter((user) => new Date(user.updated_at) > oneWeekAgo).length

  const activeUsersPercent = users.length > 0 ? Math.round((activeUsers / users.length) * 100) : 0

  // Total URLs per user
  const totalUserUrls = users.reduce((total, user) => total + user.snabled.length + user.favorites.length, 0)

  const avgUrlsPerUser = users.length > 0 ? Math.round(totalUserUrls / users.length) : 0

  // Sessions today
  const sessionsToday = sessions.filter((session) => new Date(session.created_at) > oneDayAgo).length

  // User activity breakdown
  const userActivityBreakdown = [
    {
      label: 'With Figma Data',
      count: figmaUsers,
      percentage: figmaUsersPercent,
    },
    {
      label: 'Active (7 days)',
      count: activeUsers,
      percentage: activeUsersPercent,
    },
    {
      label: 'With Favorites',
      count: users.filter((u) => u.favorites.length > 0).length,
      percentage: users.length > 0 ? Math.round((users.filter((u) => u.favorites.length > 0).length / users.length) * 100) : 0,
    },
    {
      label: 'Total Users',
      count: users.length,
      percentage: 100,
    },
  ]

  // Top domains
  const domainCounts: Record<string, number> = {}
  sessions.forEach((session) => {
    try {
      const domain = new URL(session.url).hostname.replace('www.', '')
      domainCounts[domain] = (domainCounts[domain] || 0) + 1
    } catch {
      // Invalid URL, skip
    }
  })

  const topDomains = Object.entries(domainCounts)
    .map(([domain, count]) => ({domain, count}))
    .sort((a, b) => b.count - a.count)

  return {
    figmaUrls,
    figmaUsersPercent,
    activeUsers,
    activeUsersPercent,
    avgUrlsPerUser,
    totalUserUrls,
    sessionsToday,
    userActivityBreakdown,
    topDomains,
  }
}

function generateChartData(sessions: Session[]) {
  const last7Days = []
  const now = new Date()

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

    const count = sessions.filter((session) => {
      const sessionDate = new Date(session.created_at)
      return sessionDate >= dayStart && sessionDate < dayEnd
    }).length

    last7Days.push({
      day: date.toLocaleDateString('en', {weekday: 'short'}),
      count,
      date: date.toISOString().split('T')[0],
    })
  }

  return last7Days
}
