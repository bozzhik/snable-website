import {cn} from '@/lib/utils'

type Props = {
  type: TypoTypes
  className?: string
  children: React.ReactNode
}

export type TypoTypes = keyof typeof typoClasses

export const typoClasses = {
  h1: cn('text-8xl sm:text-6xl leading-none! font-semibold tracking-tighter', 'text-gray'),
  h2: cn('text-[32px] xl:text-[26px] sm:text-2xl leading-none! font-semibold tracking-tight', 'text-white'),

  h4: cn('text-xl sm:text-base uppercase', 'font-mono text-white-dirty'),
  h5: cn('text-base uppercase', 'font-mono text-white-dirty'),
  p: cn('text-lg sm:text-base !leading-[1.4] lowercase', 'text-white-dirty'),
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
export const H2 = createTypography('h2')

export const H4 = createTypography('h4')
export const H5 = createTypography('h5')
export const P = createTypography('p')
