'use client'

import type {User} from '@/utils/getDashboard'

import {cn, formatTime, getTimeAgo} from '@/lib/utils'

import {useState} from 'react'

import {H5, P} from '~/UI/Typography'

export function TabUsers({users}: {users: User[]}) {
  return (
    <section data-block="users-tab" className="flex flex-col gap-2.5">
      {users.map((user) => (
        <UserCard key={user.token} user={user} />
      ))}
    </section>
  )
}

function UserCard({user}: {user: User}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set())

  const isMe = user.mark === 'ME'

  const createdDate = formatTime(user.created_at, 'date')
  const updatedAgo = getTimeAgo(user.updated_at)

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const hasData = (section: string) => {
    switch (section) {
      case 'snabled':
        return user.snabled.length > 0
      case 'favorites':
        return user.favorites.length > 0
      case 'figma_bridge':
        return user.figma_bridge && user.figma_bridge.urls && Array.isArray(user.figma_bridge.urls) && user.figma_bridge.urls.length > 0
      case 'figma_plugin':
        return user.figma_plugin && user.figma_plugin.urls && Array.isArray(user.figma_plugin.urls) && user.figma_plugin.urls.length > 0
      default:
        return false
    }
  }

  return (
    <div className={cn('p-4 sm:p-3 border rounded-lg transition-colors', isMe ? 'bg-gray-medium border-gray' : 'bg-black-light border-gray-medium')}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <mark className="px-2 py-1 bg-gray/20 text-gray font-mono text-sm rounded-md">{user.token}</mark>
          {isMe && <mark className="px-2 py-1 font-mono text-sm text-black rounded-sm bg-gray/50">ME</mark>}
        </div>

        <div className="text-right space-y-0.5">
          <P className="text-white !text-xs font-mono">{updatedAgo}</P>
          <P className="text-gray !text-xs font-mono">{createdDate}</P>
        </div>
      </div>

      <div className="space-y-3">
        {hasData('snabled') && (
          <DataSection title="Snabled" count={user.snabled.length} isExpanded={expandedSections.has('snabled')} onToggle={() => toggleSection('snabled')}>
            <div className="space-y-2">
              {user.snabled.map((url, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-dark/50 rounded text-blue-400 hover:text-blue-300 text-sm font-mono truncate">
                  {url}
                </a>
              ))}
            </div>
          </DataSection>
        )}

        {hasData('favorites') && (
          <DataSection title="Favorites" count={user.favorites.length} isExpanded={expandedSections.has('favorites')} onToggle={() => toggleSection('favorites')}>
            <div className="space-y-2">
              {user.favorites.map((url, idx) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-dark/50 rounded text-blue-400 hover:text-blue-300 text-sm font-mono truncate">
                  {url}
                </a>
              ))}
            </div>
          </DataSection>
        )}

        {hasData('figma_bridge') && (
          <DataSection title="Figma Bridge" count={user.figma_bridge?.urls?.length || 0} isExpanded={expandedSections.has('figma_bridge')} onToggle={() => toggleSection('figma_bridge')}>
            <div className="space-y-2">
              {user.figma_bridge?.urls?.map((url: string, idx: number) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-dark/50 rounded text-blue-400 hover:text-blue-300 text-sm font-mono truncate">
                  {url}
                </a>
              ))}
            </div>
          </DataSection>
        )}

        {hasData('figma_plugin') && (
          <DataSection title="Figma Plugin" count={user.figma_plugin?.urls?.length || 0} isExpanded={expandedSections.has('figma_plugin')} onToggle={() => toggleSection('figma_plugin')}>
            <div className="space-y-2">
              {user.figma_plugin?.urls?.map((url: string, idx: number) => (
                <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="block p-2 bg-gray-dark/50 rounded text-blue-400 hover:text-blue-300 text-sm font-mono truncate">
                  {url}
                </a>
              ))}
            </div>
          </DataSection>
        )}
      </div>
    </div>
  )
}

function DataSection({title, count, isExpanded, onToggle, children}: {title: string; count: number; isExpanded: boolean; onToggle: () => void; children: React.ReactNode}) {
  return (
    <div className="border border-gray-dark rounded-lg overflow-hidden">
      <button onClick={onToggle} className="w-full p-3 sm:py-2 bg-gray-dark/20 hover:bg-gray-dark/40 transition-colors text-left flex items-center justify-between">
        <H5 className="sm:text-sm text-gray-light font-mono">{title}</H5>

        <div className="flex items-center gap-2">
          <mark className="px-1 py-0.5 bg-gray/20 text-gray font-mono text-xs rounded-sm">{count}</mark>

          <span className={cn('transform transition-transform', isExpanded && 'rotate-180')}>▼</span>
        </div>
      </button>

      {isExpanded && count > 0 && <div className="p-3 border-t border-gray-dark">{children}</div>}
    </div>
  )
}
