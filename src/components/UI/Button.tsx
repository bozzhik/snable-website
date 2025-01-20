import {cn, m} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  text: string
  variant?: 'solid' | 'outline'
  size?: 'base' | 'small'
  className?: string
  to?: string
  target?: '_blank' | '_self'
}

const buttonVariants = {
  DEFAULT: m('w-fit px-4 py-3 flex items-center justify-center border rounded-lg duration-300', 'font-mono uppercase tracking-wide font-semibold'),
  solid: 'bg-white text-black border-white hover:bg-white/85',
  outline: 'bg-black text-white border-gray-light hover:border-white/60',
}

const buttonSizes = {
  base: 'text-base',
  small: 'px-4 py-3 text-sm',
}

export default function Button({text, variant = 'solid', size = 'base', className, to, target = '_self'}: Props) {
  const buttonStyles = cn(buttonVariants.DEFAULT, buttonVariants[variant], buttonSizes[size])

  if (to) {
    return (
      <Link href={to} className={cn(buttonStyles, className)} target={target}>
        {text}
      </Link>
    )
  }

  return <button className={cn(buttonStyles, className)}>{text}</button>
}
