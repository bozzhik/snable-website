'use client'

import type {Session, User} from '@/utils/getDashboard'
import type {DashboardData} from '~/App/dashboard/Board'
import {PROJECT_LINKS} from '@/lib/constants'

import * as React from 'react'
import {Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, Tooltip} from 'recharts'

import {cn, getTimeAgo} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import Link from 'next/link'
import {H3, H5, P} from '~/UI/Typography'

const TIME_RANGES = {
  '7d': {label: 'Last 7 days', days: 7},
  '30d': {label: 'Last 30 days', days: 30},
  '90d': {label: 'Last 3 months', days: 90},
  all: {label: 'All time', days: null},
} as const

const STAT_COLORS = {
  blue: 'text-[#60a5fa]',
  green: 'text-[#4ade80]',
  purple: 'text-[#a78bfa]',
  orange: 'text-[#fb923c]',
  red: 'text-[#f87171]',
} as const

type TimeRange = keyof typeof TIME_RANGES

export function BoardStats({sessions, users, consumers}: DashboardData) {
  const stats = calculateStats(sessions, users)

  const usersConfig = [
    {title: 'Snable Chrome Extension', value: consumers.extension, color: STAT_COLORS.red, link: PROJECT_LINKS.extension},
    {title: 'Snable Figma Plugin', value: consumers.plugin, color: STAT_COLORS.purple, link: PROJECT_LINKS.figma_plugin_stats},
  ]

  const statsConfig = [
    {title: 'Sessions Today', value: stats.sessionsToday, description: 'Since 00:00 today', trend: getTimeAgo(sessions[0]?.created_at || new Date().toISOString()), color: STAT_COLORS.orange},
    {title: 'Active Users', value: stats.activeUsers, description: 'Updated recently', trend: `${stats.activeUsersPercent}% this week`, color: STAT_COLORS.green},
    {title: 'New Users', value: stats.newUsersThisWeek, description: 'First snabled this week', trend: 'Snabled first time', color: STAT_COLORS.red},
    // {title: 'Avg URLs per User', value: stats.avgUrlsPerUser, description: 'Snabled + Favorites', trend: `${stats.totalUserUrls} total URLs`, color: STAT_COLORS.purple},
    {title: 'Total Figma URLs', value: stats.figmaUrls, description: 'Figma Bridge + Plugin', trend: `${stats.figmaUsersPercent}% of users (${stats.figmaSessionsPercent}%)`, color: STAT_COLORS.blue},
  ]

  return (
    <div data-block="stats-board" className="space-y-4 sm:space-y-3">
      <div data-block="stats-cards-board" className="grid grid-cols-4 sm:grid-cols-2 gap-3.5 sm:gap-2.5">
        {statsConfig.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <ChartAreaInteractive sessions={sessions} />

      <div data-block="users-cards-board" className="grid grid-cols-2 gap-3.5 sm:gap-2.5">
        {usersConfig.map((stat) => (
          <Link href={stat.link} target="_blank" className="p-4 bg-black-light border border-gray-medium rounded-lg hover:bg-black hover:border-gray-medium/70 transition-colors" key={stat.title}>
            <div className="flex sm:flex gap-4 items-center sm:h-full">
              <H3 className={stat.color}>{stat.value}</H3>
              <H5 className="flex-1 text-center !text-xs text-gray font-mono">{stat.title}</H5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function StatCard({title, value, description, trend, color}: {title: string; value: string | number; description: string; trend: string; color: string}) {
  return (
    <div className={cn('p-4 bg-black-light border border-gray-medium rounded-lg', 'hover:bg-black hover:border-gray-medium/70 transition-colors')} title={description}>
      <div className="space-y-2">
        <P className="text-gray !text-sm first-letter:uppercase">{title}</P>
        <H3 className={color}>{value}</H3>
        <H5 className="!text-xs text-gray font-mono">{trend}</H5>
      </div>
    </div>
  )
}

function ChartAreaInteractive({sessions}: {sessions: Session[]}) {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [timeRange, setTimeRange] = React.useState<TimeRange>('7d')

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('7d')
    }
  }, [isMobile])

  const chartData = generateSessionsChartData(sessions, timeRange)
  const totalSessions = chartData.reduce((total, day) => total + day.sessions, 0)
  const comparison = calculatePeriodComparison(sessions, timeRange)

  return (
    <div data-block="chats-stats-board" className="p-4 sm:p-4 bg-black-light border border-gray-medium rounded-lg">
      <div className="flex sm:flex-col sm:gap-4 items-center sm:items-start justify-between mb-6">
        <div className="flex items-center gap-3">
          <P className="text-gray font-mono">
            <span className="text-white">{totalSessions}</span> sessions
          </P>

          {comparison && (
            <div className={cn('flex items-center gap-1 text-xs font-mono px-2 py-1 rounded', comparison.change >= 0 ? 'text-[#4ade80] bg-[#4ade80]/10' : 'text-[#f87171] bg-[#f87171]/10')}>
              <span>
                {comparison.change >= 0 ? '+' : ''}
                {comparison.change}%
              </span>
              <span className="text-gray">vs prev</span>
            </div>
          )}
        </div>

        <div className="flex sm:grid sm:grid-cols-2 gap-1.5 sm:w-full">
          {Object.entries(TIME_RANGES).map(([key, {label}]) => (
            <button key={key} onClick={() => setTimeRange(key as TimeRange)} className={cn('sm:w-full px-3 py-1 sm:py-1.25 text-xs rounded-md transition-colors', timeRange === key ? 'bg-gray text-black' : 'bg-gray-dark text-gray hover:bg-gray-medium')}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <ChartContainer data={chartData} />
    </div>
  )
}

function ChartContainer({data}: {data: Array<{date: string; sessions: number}>}) {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#919191" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#717171" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tick={{fill: '#9c9c9c', fontSize: 12}}
            tickFormatter={(value) => {
              const date = new Date(value)
              return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })
            }}
          />
          <CartesianGrid stroke="#4040402c" strokeDasharray="0" />
          <Tooltip
            content={({active, payload, label}) => {
              if (active && payload && payload.length && label) {
                const date = new Date(label)
                return (
                  <div className="bg-black-light border border-gray-medium rounded-lg p-3 shadow-lg">
                    <p className="text-gray text-sm mb-1">
                      {date.toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-white font-medium">Sessions: {payload[0].value}</p>
                  </div>
                )
              }
              return null
            }}
          />
          <Area type="monotone" dataKey="sessions" stroke="#818181" fillOpacity={1} fill="url(#colorSessions)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

function calculateStats(sessions: Session[], users: User[]) {
  const now = new Date()

  // Today calculation - from start of today (00:00) to now
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

  // Sessions calculations - count sessions from start of today
  const sessionsToday = sessions.filter((session) => new Date(session.created_at) >= startOfToday).length

  // User calculations
  const usersWithFigmaData = users.filter((user) => (user.figma_bridge?.urls?.length || 0) > 0 || (user.figma_plugin?.urls?.length || 0) > 0)
  const usersWithFavorites = users.filter((u) => u.favorites.length > 0)
  const activeUsers = users.filter((user) => new Date(user.updated_at) > oneWeekAgo)

  // New users this week calculation (first snable this week)
  const sessionsByUrl = new Map<string, Date[]>()
  sessions.forEach((session) => {
    if (!sessionsByUrl.has(session.url)) {
      sessionsByUrl.set(session.url, [])
    }
    sessionsByUrl.get(session.url)!.push(new Date(session.created_at))
  })

  let newUsersThisWeek = 0

  for (const user of users) {
    if (user.snabled.length === 0) continue

    // Find the earliest date among all user's snables
    let earliestDate: Date | null = null

    for (const url of user.snabled) {
      const sessionDates = sessionsByUrl.get(url)
      if (sessionDates && sessionDates.length > 0) {
        const earliest = new Date(Math.min(...sessionDates.map((d) => d.getTime())))
        if (!earliestDate || earliest < earliestDate) {
          earliestDate = earliest
        }
      }
    }

    // If the earliest date is within the week - the user is new
    if (earliestDate && earliestDate >= oneWeekAgo) {
      newUsersThisWeek++
    }
  }

  // Figma URLs count
  const figmaUrls = users.reduce((total, user) => {
    const bridgeUrls = user.figma_bridge?.urls?.length || 0
    const pluginUrls = user.figma_plugin?.urls?.length || 0
    return total + bridgeUrls + pluginUrls
  }, 0)

  // URL calculations
  const totalUserUrls = users.reduce((total, user) => total + user.snabled.length + user.favorites.length, 0)
  const avgUrlsPerUser = users.length > 0 ? Math.round(totalUserUrls / users.length) : 0

  // Percentage calculations
  const getPercentage = (count: number) => (users.length > 0 ? Math.round((count / users.length) * 100) : 0)

  const figmaUsersPercent = getPercentage(usersWithFigmaData.length)
  const activeUsersPercent = getPercentage(activeUsers.length)

  // Calculate figma URLs percentage from total sessions
  const figmaSessionsPercent = sessions.length > 0 ? Math.round((figmaUrls / sessions.length) * 100) : 0

  // Domain analysis
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

  const userActivityBreakdown = [
    {label: 'With Figma Data', count: usersWithFigmaData.length, percentage: figmaUsersPercent},
    {label: 'Active (7 days)', count: activeUsers.length, percentage: activeUsersPercent},
    {label: 'With Favorites', count: usersWithFavorites.length, percentage: getPercentage(usersWithFavorites.length)},
    {label: 'Total Users', count: users.length, percentage: 100},
  ]

  return {
    figmaUrls,
    figmaUsersPercent,
    figmaSessionsPercent,
    activeUsers: activeUsers.length,
    activeUsersPercent,
    avgUrlsPerUser,
    totalUserUrls,
    sessionsToday,
    newUsersThisWeek,
    userActivityBreakdown,
    topDomains,
  }
}

function generateSessionsChartData(sessions: Session[], timeRange: TimeRange) {
  const now = new Date()
  const timeConfig = TIME_RANGES[timeRange]

  let days: number
  if (timeConfig.days) {
    days = timeConfig.days
  } else {
    // For 'all' time range
    if (sessions.length === 0) return []

    const earliestSession = sessions.reduce((earliest, session) => {
      const sessionDate = new Date(session.created_at)
      return sessionDate < new Date(earliest.created_at) ? session : earliest
    })

    const daysDiff = Math.ceil((now.getTime() - new Date(earliestSession.created_at).getTime()) / (1000 * 60 * 60 * 24))
    days = Math.min(daysDiff, 365) // Max 1 year
  }

  const chartData = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000)

    const sessionsCount = sessions.filter((session) => {
      const sessionDate = new Date(session.created_at)
      return sessionDate >= dayStart && sessionDate < dayEnd
    }).length

    chartData.push({
      date: date.toISOString().split('T')[0],
      sessions: sessionsCount,
    })
  }

  return chartData
}

function calculatePeriodComparison(sessions: Session[], timeRange: TimeRange) {
  // Only calculate comparison for specific time ranges, not 'all'
  if (timeRange === 'all') return null

  const now = new Date()
  const timeConfig = TIME_RANGES[timeRange]
  const days = timeConfig.days!

  // Current period
  const currentPeriodStart = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const currentPeriodSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.created_at)
    return sessionDate >= currentPeriodStart && sessionDate <= now
  }).length

  // Previous period (same duration, but shifted back)
  const previousPeriodStart = new Date(now.getTime() - days * 2 * 24 * 60 * 60 * 1000)
  const previousPeriodEnd = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const previousPeriodSessions = sessions.filter((session) => {
    const sessionDate = new Date(session.created_at)
    return sessionDate >= previousPeriodStart && sessionDate < previousPeriodEnd
  }).length

  // Calculate percentage change
  const change = previousPeriodSessions === 0 ? (currentPeriodSessions > 0 ? 100 : 0) : Math.round(((currentPeriodSessions - previousPeriodSessions) / previousPeriodSessions) * 100)

  return {
    current: currentPeriodSessions,
    previous: previousPeriodSessions,
    change,
  }
}
