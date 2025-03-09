'use client'

import {HEADER_DATA, PROJECT_LINKS} from '@/lib/constants'
import {HEADER_BOX} from '~/Global/Container'

import {useState, useLayoutEffect} from 'react'
import {motion, AnimatePresence, useScroll, useTransform} from 'framer-motion'
import {useMediaQuery} from '@/lib/use-media-query'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Button, {BUTTON_SIZES, BUTTON_VARIANTS} from '~/UI/Button'
import {LINKS, type SocialSource} from '@/app/socials/storage'
import SocialsIcon from '~~/socials/SocialsIcon'
import {Menu, X} from 'lucide-react'

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
            <Link href={link.to} target={link.external ? '_blank' : '_self'} className={cn('block text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} key={link.to}>
              <span>{link.label}</span>
            </Link>
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
          <motion.div className={cn('fixed z-[100] inset-0 flex flex-col gap-10 items-center justify-center', 'bg-black bg-opacity-90')} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '-100%'}} transition={{duration: 0.5, ease: 'easeInOut'}}>
            <nav className="flex flex-col gap-2.5 items-center">
              {HEADER_DATA.LINKS.map((link) => (
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4}} key={link.to}>
                  <Link href={link.to} target={link.external ? '_blank' : '_self'} className={cn('block text-3xl text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} onClick={toggleMenu}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5 items-center">
              {HEADER_DATA.MOBILE_LINKS.map((link) => (
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4}} key={link.to}>
                  <Link href={link.to} target={link.external ? '_blank' : '_self'} className={cn('block text-3xl text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} onClick={toggleMenu}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2 items-center">
              {Object.entries(LINKS).map(([key, url]) => (
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4}} key={key}>
                  <Button to={url} size="small" className="w-full px-8 gap-1.5" text={undefined} icon={<SocialsIcon className="sm:size-8 sm:p-0" source={key as SocialSource} />} target="_blank" onClick={toggleMenu} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
