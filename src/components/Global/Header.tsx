import {HEADER_DATA} from '@/lib/constants'
import {HEADER_BOX} from '~/Global/Container'

import {cn, m} from '@/lib/utils'

import Link from 'next/link'
import Button from '~/UI/Button'

export default function Header() {
  return (
    <header className={cn('fixed w-full py-6 z-[99]', HEADER_BOX)}>
      <div className={m('p-2 grid grid-cols-10 items-center rounded-2xl', 'bg-black border border-gray-dark')}>
        <Link href="/" className="group flex gap-2 items-center pl-1.5">
          <div className="size-8 bg-white rounded-full group-hover:scale-[1.05] group-hover:bg-gray duration-300"></div>
          <span className="text-[27px] tracking-tight">Snable</span>
        </Link>

        <nav className={m('col-span-8', 'flex gap-6 justify-self-center')}>
          {Object.entries(HEADER_DATA.LINKS).map(([key, label]) => {
            return (
              <Link href={`/${key}`} className={m('block text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} key={key}>
                <span>{label}</span>
              </Link>
            )
          })}
        </nav>

        {Object.entries(HEADER_DATA.ACTION).map(([key, action]) => {
          return <Button className="justify-self-end" to={action.to} variant={action.variant as 'solid' | 'outline'} size="small" text={action.label} key={key} />
        })}
      </div>
    </header>
  )
}
