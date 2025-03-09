import {cn} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  text: string | undefined
  icon?: React.ReactElement
  variant?: 'solid' | 'outline'
  size?: 'base' | 'small'
  className?: string
  to?: string
  target?: '_blank' | '_self'
  onClick?: () => void
}

export const BUTTON_VARIANTS = {
  DEFAULT: cn('w-fit px-4 py-3 flex gap-3 items-center justify-center border rounded-lg duration-300', 'font-mono uppercase tracking-wide'),
  solid: 'bg-white text-black border-white hover:bg-white/85',
  outline: 'bg-black text-white border-gray-medium hover:border-white/60',
}

export const BUTTON_SIZES = {
  base: 'py-4 text-base',
  small: 'px-4 py-3 sm:px-3 sm:py-2.5 text-sm font-semibold',
}

export default function Button({text, icon, variant = 'solid', size = 'base', className, to, target = '_self', onClick}: Props) {
  const buttonStyles = cn(BUTTON_VARIANTS.DEFAULT, BUTTON_VARIANTS[variant], BUTTON_SIZES[size])

  if (to) {
    return (
      <Link href={to} className={cn(buttonStyles, className)} target={target} onClick={onClick}>
        {icon}
        {text}
      </Link>
    )
  }

  return (
    <button className={cn(buttonStyles, className)} onClick={onClick}>
      {icon}
      {text}
    </button>
  )
}
