import {cn, m} from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export const HEADER_BOX = 'px-[10rem]'
const WEBSITE_BOX = m('px-[19rem]', 'pt-48 pb-20')

export default function Container({children, className}: Props) {
  return <main className={cn(WEBSITE_BOX, className)}>{children}</main>
}
