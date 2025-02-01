import {cn} from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'compact'
}

export const BOX_STYLES = {
  default: {
    box: 'px-[19rem] xl:px-[2rem] sm:px-2.5',
    padding: 'pt-48 xl:pt-40 sm:pt-32 pb-20',
  },
  compact: {
    box: 'px-[38rem] xl:px-[23rem] sm:px-2',
    padding: 'pt-32 xl:pt-28 sm:pt-24 pb-16',
  },
}

export const HEADER_BOX = 'px-[10rem] xl:px-[2rem] sm:px-2'
export const MINI_BLOCK = 'px-[42rem] xl:px-[25rem] sm:px-2'

export default function Container({children, className, variant = 'default'}: Props) {
  const {box, padding} = BOX_STYLES[variant]

  return <main className={cn(box, padding, className)}>{children}</main>
}
