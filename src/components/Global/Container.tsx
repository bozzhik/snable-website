import {cn, m} from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export const HEADER_BOX = 'px-[10rem] xl:px-[2rem] sm:px-2'
const WEBSITE_BOX = m('px-[19rem] xl:px-[2rem] sm:px-2', 'pt-48 xl:pt-40 pb-20')

export default function Container({children, className}: Props) {
  return <main className={cn(WEBSITE_BOX, className)}>{children}</main>
}
