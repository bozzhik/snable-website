'use client'

import {typoClasses} from '~/UI/Typography'

import {cn} from '@/lib/utils'
import {motion, useAnimationControls} from 'framer-motion'
import {useEffect, useRef, useCallback} from 'react'

const PARAMS = {
  ease: 'linear',
  repeat: Infinity,
  duration: 3,
}

export function Heading({children}: {children: React.ReactNode}) {
  const controls = useAnimationControls()
  const textRef = useRef<HTMLHeadingElement>(null)

  const updateAnimation = useCallback(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth
      const startPos = textWidth * -0.5
      const endPos = textWidth * 1.25

      controls.start({
        backgroundPosition: [`${startPos}px`, `${endPos}px`],
        transition: {
          duration: PARAMS.duration,
          ease: PARAMS.ease,
          repeat: PARAMS.repeat,
        },
      })
    }
  }, [controls])

  useEffect(() => {
    updateAnimation()
    window.addEventListener('resize', updateAnimation)

    return () => {
      window.removeEventListener('resize', updateAnimation)
    }
  }, [updateAnimation])

  return (
    <motion.h1
      ref={textRef}
      className={cn(typoClasses.h1, 'relative text-transparent w-fit bg-clip-text selection:text-gray')}
      style={{
        backgroundImage: `linear-gradient(to right, #707070 0%, #CFCFCF 10%, #707070 20%)`,
        backgroundSize: '200%',
      }}
      animate={controls}
    >
      {children}
    </motion.h1>
  )
}
