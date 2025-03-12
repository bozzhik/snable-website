'use client'

import {useInView} from 'framer-motion'
import {useRef, useState} from 'react'
import {cn} from '@/lib/utils'

import {AnimatedNumber} from '~/Modules/AnimatedNumber'

export function Counter({initialValue, className}: {initialValue: number; className?: string}) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref)

  if (isInView && value === 0) {
    setValue(initialValue)
  }

  return (
    <span className={cn(className)} ref={ref}>
      <AnimatedNumber
        className="inline-flex items-center"
        springOptions={{
          bounce: 0,
          duration: 5000,
        }}
        value={value}
      />
    </span>
  )
}
