'use client'

import type {Session, User} from '@/utils/getDashboard'

import {cn} from '@/lib/utils'

import {useState} from 'react'

import {BoardStats} from '~~/dashboard/BoardStats'
import {BoardTabs} from '~~/dashboard/BoardTabs'
import {TabSessions} from '~~/dashboard/TabSessions'
import {TabUsers} from '~~/dashboard/TabUsers'

type Tab = 'sessions' | 'users'

export function Board({sessions, users, className}: {sessions: Session[]; users: User[]; className?: string}) {
  const [activeTab, setActiveTab] = useState<Tab>('sessions')

  return (
    <section data-section="board-dashboard" className={cn('space-y-6', className)}>
      <BoardStats sessions={sessions} users={users} />

      <BoardTabs activeTab={activeTab} onTabChange={setActiveTab} sessionsCount={sessions.length} usersCount={users.length} />

      {activeTab === 'sessions' && <TabSessions sessions={sessions} />}
      {activeTab === 'users' && <TabUsers users={users} />}
    </section>
  )
}
