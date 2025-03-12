'use client'

import {cn} from '@/lib/utils'
import {motion, SpringOptions, useSpring, useTransform} from 'framer-motion'
import {useEffect} from 'react'

export type AnimatedNumberProps = {
  value: number
  className?: string
  springOptions?: SpringOptions
}

const MotionSpan = motion.span

export function AnimatedNumber({value, className, springOptions}: AnimatedNumberProps) {
  const spring = useSpring(value, springOptions)
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  return <MotionSpan className={cn('tabular-nums', className)}>{display}</MotionSpan>
}
