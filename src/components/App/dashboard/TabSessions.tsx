'use client'

import type {Session} from '@/utils/getDashboard'

import {cn, cleanUrl, formatTime} from '@/lib/utils'
import {useMediaQuery} from '@/hooks/use-media-query'

import {H5, P} from '~/UI/Typography'
import Link from 'next/link'

export function TabSessions({sessions}: {sessions: Session[]}) {
  return (
    <section className="flex flex-col gap-2.5">
      {sessions.map((session) => (
        <SessionCard key={session.id} session={session} />
      ))}
    </section>
  )
}

function SessionCard({session}: {session: Session}) {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const formattedDate = formatTime(session.created_at)

  return (
    <Link href={session.url} className={cn('px-2.5 py-2.5 flex items-center gap-4', 'bg-black-light border border-gray-medium rounded-lg', 'hover:border-gray duration-200')} target="_blank" rel="noopener noreferrer">
      <div className="size-10 flex-shrink-0 grid place-items-center overflow-hidden bg-gray-dark/50 rounded-md">
        {session.favicon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="object-contain object-center rounded-sm max-w-full max-h-full" src={session.favicon} alt="" />
        ) : (
          <div className="size-6 bg-gray-medium rounded-sm" />
        )}
      </div>

      <div className="flex sm:flex-col sm:gap-1 flex-1 justify-between">
        <div className="flex flex-col gap-1 sm:gap-0.5">
          <H5 className="text-white line-clamp-1 leading-tight flex-1 min-w-0">{session.title.length > (isDesktop ? 50 : 25) ? session.title.slice(0, isDesktop ? 45 : 22) + '..' : session.title}</H5>

          <P className="text-gray font-mono !text-xs">{cleanUrl(session.url.length > (isDesktop ? 50 : 30) ? session.url.slice(0, isDesktop ? 45 : 30) + '..' : session.url)}</P>
        </div>

        <div className={cn('flex flex-col sm:flex-row-reverse items-end sm:items-start', session.note ? 'justify-between' : 'justify-end')}>
          {session.note && <mark className="px-1 py-0.25 font-mono text-xs text-black rounded-sm bg-gray/50">{session.note}</mark>}

          <P className="text-gray font-mono !text-xs flex-shrink-0 whitespace-nowrap">{formattedDate}</P>
        </div>
      </div>
    </Link>
  )
}
