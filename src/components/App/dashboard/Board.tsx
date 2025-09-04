'use client'

import type {Session, User} from '@/utils/getDashboard'
import type {Consumers} from '@/utils/fetchConsumers'

import {useState} from 'react'

import {BoardStats} from '~~/dashboard/BoardStats'
import {BoardTabs} from '~~/dashboard/BoardTabs'
import {TabSessions} from '~~/dashboard/TabSessions'
import {TabUsers} from '~~/dashboard/TabUsers'

type Tab = 'sessions' | 'users'

export type DashboardData = {
  sessions: Session[]
  users: User[]
  consumers: Consumers
}

export function Board({sessions, users, consumers}: DashboardData) {
  const [activeTab, setActiveTab] = useState<Tab>('sessions')

  return (
    <section data-section="board-dashboard" className="space-y-6">
      <BoardStats sessions={sessions} users={users} consumers={consumers} />

      <BoardTabs activeTab={activeTab} onTabChange={setActiveTab} sessionsCount={sessions.length} usersCount={users.length} />

      {activeTab === 'sessions' && <TabSessions sessions={sessions} />}
      {activeTab === 'users' && <TabUsers users={users} />}
    </section>
  )
}
