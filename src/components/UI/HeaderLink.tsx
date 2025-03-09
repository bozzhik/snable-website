import {cn} from '@/lib/utils'
import Link from 'next/link'

type Props = {
  href: string
  label: string
  variant: 'desktop' | 'mobile'
  external?: boolean
  onClick?: () => void
}

export function HeaderLink({variant, href, label, external, onClick}: Props) {
  if (variant === 'desktop') {
    return (
      <Link href={href} target={external ? '_blank' : '_self'} className={cn('block text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} onClick={onClick}>
        <span>{label}</span>
      </Link>
    )
  }

  return (
    <Link href={href} target={external ? '_blank' : '_self'} className={cn('w-full py-3 flex items-center justify-center', 'font-mono font-semibold uppercase tracking-wide', 'bg-white text-black border-white rounded-lg')} onClick={onClick}>
      {label}
    </Link>
  )
}
