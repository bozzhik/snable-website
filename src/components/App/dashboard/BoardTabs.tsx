'use client'

import {cn} from '@/lib/utils'

type Tab = 'sessions' | 'users'

interface DashboardTabsProps {
  activeTab: Tab
  onTabChange: (tab: Tab) => void
  sessionsCount: number
  usersCount: number
}

export function BoardTabs({activeTab, onTabChange, sessionsCount, usersCount}: DashboardTabsProps) {
  const tabs = [
    {id: 'sessions' as const, label: 'Sessions', count: sessionsCount},
    {id: 'users' as const, label: 'Users', count: usersCount},
  ]

  return (
    <div data-block="tabs-board" className="border-b border-gray-medium">
      <nav className="flex gap-6">
        {tabs.map((tab) => (
          <button className={cn('py-2.5 px-1 border-b-2 text-sm font-mono uppercase duration-200', activeTab === tab.id ? 'border-white-dirty text-white-dirty' : 'border-transparent text-gray hover:text-gray-light hover:border-gray-medium')} onClick={() => onTabChange(tab.id)} key={tab.id}>
            {tab.label} <mark className={cn('px-1 py-0.5', 'text-xs text-black rounded-sm', activeTab === tab.id ? 'bg-white-dirty/70' : 'bg-gray/50')}>{tab.count}</mark>
          </button>
        ))}
      </nav>
    </div>
  )
}
