'use client'

import {HEADER_DATA} from '@/lib/constants'
import {HEADER_BOX} from '~/Global/Container'
import {Menu, X} from 'lucide-react'

import {useState, useLayoutEffect} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import {useMediaQuery} from '@/lib/use-media-query'
import {cn} from '@/lib/utils'

import Link from 'next/link'
import Button, {BUTTON_SIZES, BUTTON_VARIANTS} from '~/UI/Button'
import {LINKS, type SocialSource} from '@/app/socials/storage'
import SocialsIcon from '~~/socials/SocialsIcon'

export default function Header() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  useLayoutEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className={cn('fixed z-[999] w-full pt-6 xl:pt-4 sm:pt-2', HEADER_BOX)}>
      <div className={cn('relative z-[150]', 'p-2 sm:p-1.5 grid grid-cols-5 sm:flex sm:justify-between items-center rounded-2xl', 'bg-black border border-gray-dark')}>
        <Link href="/" className="group w-fit flex gap-2 items-center pl-1.5" onClick={() => !isDesktop && isMenuOpen && setIsMenuOpen(false)}>
          <div className="size-8 sm:size-6 bg-white rounded-full group-hover:scale-[1.05] group-hover:bg-gray duration-300"></div>
          <span className="text-[27px] sm:text-2xl tracking-tight">Snable</span>
        </Link>

        <nav className={cn('col-span-3', 'flex gap-6 justify-self-center', 'sm:hidden')}>
          {Object.entries(HEADER_DATA.LINKS).map(([key, label]) => (
            <Link href={`/${key}`} className={cn('block text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} key={key}>
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className={cn('justify-self-end', 'flex justify-between gap-[7px]')}>
          {Object.entries(HEADER_DATA.ACTION).map(([key, action]) => (
            <Button to={action.to} variant={action.variant} size="small" text={isDesktop ? 'Get Notified' : 'Notify Me'} key={key} onClick={() => !isDesktop && isMenuOpen && setIsMenuOpen(false)} />
          ))}

          {!isDesktop && (
            <button className={cn([BUTTON_VARIANTS.DEFAULT, BUTTON_VARIANTS.outline], BUTTON_SIZES.small, 'sm:py-0 sm:px-2.5 border-white-dirty/40 text-white-dirty/90')} onClick={toggleMenu}>
              <motion.span key={isMenuOpen ? 'close' : 'menu'} initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.8}} transition={{duration: 0.2, ease: 'easeInOut'}}>
                {isMenuOpen ? <X /> : <Menu />}
              </motion.span>
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div className={cn('fixed z-[100] inset-0 flex flex-col gap-10 items-center justify-center', 'bg-black bg-opacity-90')} initial={{opacity: 0, y: '-100%'}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: '-100%'}} transition={{duration: 0.5, ease: 'easeInOut'}}>
            <nav className="flex flex-col gap-2.5 items-center">
              {Object.entries(HEADER_DATA.LINKS).map(([key, label]) => (
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4}} key={key}>
                  <Link href={`/${key}`} className={cn('block text-3xl text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200')} onClick={toggleMenu}>
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex flex-col gap-2.5 items-center">
              {Object.entries(HEADER_DATA.MOBILE_LINKS).map(([key, link]) => (
                <motion.div initial={{opacity: 0, y: 30}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 30}} transition={{delay: 0.4}} key={key}>
                  <Link href={link.to} className={cn('block text-3xl text-white-dirty leading-[1.1] uppercase font-mono', 'hover:text-white duration-200', link.disabled && 'text-gray opacity-70')} onClick={toggleMenu} key={key}>
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
