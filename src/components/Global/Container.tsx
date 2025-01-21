import {cn, m} from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

export const HEADER_BOX = 'px-[10rem] xl:px-[2rem] sm:px-2'

export const WEBSITE_BOX = {
  BOX: 'px-[19rem] xl:px-[2rem] sm:px-2.5',
  PADDING: 'pt-48 xl:pt-40 sm:pt-32 pb-20',
}
export const WEBSITE_CONTAINER = m(WEBSITE_BOX.BOX, WEBSITE_BOX.PADDING)

export const MINI_BOX = 'px-[42rem] xl:px-[25rem] sm:px-2'

export default function Container({children, className}: Props) {
  return <main className={cn(WEBSITE_CONTAINER, className)}>{children}</main>
}
