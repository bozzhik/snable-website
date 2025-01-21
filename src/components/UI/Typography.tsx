import {cn, m} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: m('text-8xl sm:text-6xl !leading-none font-semibold tracking-tighter', 'text-gray'),
  p: m('text-xl sm:text-base uppercase', 'font-mono text-white-dirty'),
} as const

function Typography({type, className, children}: Props) {
  const Element = type
  return <Element className={cn(typoClasses[type], className)}>{children}</Element>
}

function createTypography(type: TypoTypes) {
  const Component = ({className, children}: Omit<Props, 'type'>) => (
    <Typography type={type} className={className}>
      {children}
    </Typography>
  )
  Component.displayName = `Typography(${type.toUpperCase()})`
  return Component
}

export {Heading as H1} from '~/UI/StyledHeading'
export const P = createTypography('p')
