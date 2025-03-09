'use client'

import {HEADER_DATA, PROJECT_LINKS} from '@/lib/constants'
import {HEADER_BOX} from '~/Global/Container'
import {SCREEN_HEIGHT} from '~~/index/Hero'
import {Menu, X} from 'lucide-react'

import {useState, useLayoutEffect} from 'react'
import {motion, AnimatePresence, useScroll, useTransform} from 'framer-motion'
import {useMediaQuery} from '@/lib/use-media-query'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import {HeaderLink} from '~/UI/HeaderLink'
import Button, {BUTTON_SIZES, BUTTON_VARIANTS} from '~/UI/Button'
import SocialsGroup from '~~/socials/SocialsGroup'

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const {scrollY} = useScroll()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const shadowOpacity = useTransform(scrollY, [0, 250], ['0', '0.1'])

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  useLayoutEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={cn('fixed z-[999] w-full pt-6 xl:pt-4 sm:pt-2', HEADER_BOX)}>
      <motion.div
        className={cn('relative z-[150]', 'p-2 sm:p-1.5 grid grid-cols-5 sm:flex sm:justify-between items-center rounded-2xl', 'bg-black border border-gray-medium/70')}
        style={{
          boxShadow: useTransform(shadowOpacity, (opacity) => `0px 0px 22px rgba(204, 204, 204, ${opacity})`),
        }}
      >
        <Link href="/" className="group w-fit flex gap-2 items-center pl-1.5" onClick={() => !isDesktop && isMenuOpen && setIsMenuOpen(false)}>
          <div className="size-8 sm:size-6 bg-white rounded-full group-hover:scale-[1.05] group-hover:bg-gray duration-300"></div>
          <span className="text-[27px] sm:text-2xl tracking-tight">Snable</span>
        </Link>

        <nav className={cn('col-span-3', 'flex gap-6 justify-self-center', 'sm:hidden')}>
          {HEADER_DATA.LINKS.map((link) => (
            <HeaderLink variant="desktop" href={link.to} label={link.label} external={link.external} key={link.to} />
          ))}
        </nav>

        <div className={cn('justify-self-end', 'flex justify-between gap-[7px]')}>
          <Button to={PROJECT_LINKS.store} target="_blank" variant="solid" size="small" text="Get Extension" onClick={() => !isDesktop && isMenuOpen && setIsMenuOpen(false)} className="sm:hidden" />

          {!isDesktop && (
            <button className={cn([BUTTON_VARIANTS.DEFAULT, BUTTON_VARIANTS.outline], BUTTON_SIZES.small, 'hidden sm:block sm:py-2 sm:px-2.5 border-white-dirty/40 text-white-dirty/90')} onClick={toggleMenu}>
              <motion.span key={isMenuOpen ? 'close' : 'menu'} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} transition={{duration: 0.2, ease: 'easeInOut'}}>
                {isMenuOpen ? <X /> : <Menu />}
              </motion.span>
            </button>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className={cn(SCREEN_HEIGHT, 'fixed z-[100] inset-0 pt-10 px-2.5', 'flex flex-col items-center justify-center gap-2', 'bg-black bg-opacity-90')} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '-100%'}} transition={{duration: 0.5, ease: 'easeInOut'}}>
            <nav className="w-full flex flex-col gap-2 items-center">
              {[...HEADER_DATA.LINKS, ...HEADER_DATA.MOBILE_LINKS].map((link, index) => (
                <motion.div
                  className="w-full"
                  initial={{opacity: 0, y: 30}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 30}}
                  transition={{
                    duration: 0.6,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.4 + index * 0.1,
                  }}
                  key={link.to}
                >
                  <HeaderLink variant="mobile" href={link.to} label={link.label} external={link.external} onClick={toggleMenu} />
                </motion.div>
              ))}
            </nav>

            <motion.div
              className="w-full"
              initial={{opacity: 0, y: 30}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: 30}}
              transition={{
                duration: 0.6,
                ease: [0.25, 0.1, 0.25, 1],
                delay: 0.4 + (HEADER_DATA.LINKS.length + HEADER_DATA.MOBILE_LINKS.length) * 0.1,
              }}
            >
              <SocialsGroup variant="dark" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
