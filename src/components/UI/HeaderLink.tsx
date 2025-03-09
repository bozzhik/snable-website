import {cn} from '@/lib/utils'

import Link from 'next/link'
import {H5} from '~/UI/Typography'

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
      <Link href={href} target={external ? '_blank' : '_self'} className="block group" onClick={onClick}>
        <H5 className="leading-[1.1] group-hover:text-white duration-200">{label}</H5>
      </Link>
    )
  }

  return (
    <Link href={href} target={external ? '_blank' : '_self'} className={cn('w-full py-3 flex items-center justify-center', 'bg-white border-white rounded-lg')} onClick={onClick}>
      <H5 className="font-semibold tracking-wide text-black">{label}</H5>
    </Link>
  )
}
