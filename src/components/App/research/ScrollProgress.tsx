'use client'

import {motion, useScroll, useTransform} from 'framer-motion'

export default function ScrollProgress() {
  const {scrollYProgress} = useScroll()
  const bgColor = useTransform(scrollYProgress, [0, 1], ['#ddd', '#222'])

  return (
    <motion.div
      style={{
        scaleX: scrollYProgress,
        transformOrigin: 'left',
        backgroundColor: bgColor,
      }}
      className="fixed bottom-0 left-0 z-[999] w-full h-2 sm:h-1.5"
    ></motion.div>
  )
}
