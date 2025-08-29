'use client'

import type {Session, User} from '@/utils/getDashboard'

import {cn} from '@/lib/utils'

import {useState} from 'react'

import {BoardTabs} from '~~/dashboard/BoardTabs'
import {TabSessions} from '~~/dashboard/TabSessions'

type Tab = 'sessions' | 'users'

export function Board({sessions, users, className}: {sessions: Session[]; users: User[]; className?: string}) {
  const [activeTab, setActiveTab] = useState<Tab>('sessions')

  return (
    <div className={cn('space-y-6', className)}>
      <BoardTabs activeTab={activeTab} onTabChange={setActiveTab} sessionsCount={sessions.length} usersCount={users.length} />

      {activeTab === 'sessions' && <TabSessions sessions={sessions} />}
    </div>
  )
}
