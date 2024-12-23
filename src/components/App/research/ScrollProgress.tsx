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
      className="fixed inset-0 z-[99] w-full h-2"
    ></motion.div>
  )
}
