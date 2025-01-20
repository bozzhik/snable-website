import {cn} from '@/lib/utils'

import React, {ComponentPropsWithoutRef} from 'react'
import {highlight} from 'sugar-high'
import Link from 'next/link'

export const MDX = {
  h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('hidden', className)} {...props} />,
  h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => {
    const textContent = typeof props.children === 'string' ? props.children : React.Children.toArray(props.children).join('')
    const anchorId = textContent
      .toLowerCase()
      .replace(/[^a-z0-9а-яё\s-]/gi, '')
      .replace(/\s+/g, '-')

    return <h2 id={anchorId} className={cn('scroll-mt-4 uppercase mt-10 text-neutral-500 mb-4 text-3xl sm:text-2xl font-semibold tracking-tight', className)} {...props} />
  },
  h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('uppercase mt-10 text-neutral-500 mb-4 sm:mr-4 text-2xl font-semibold tracking-[-0.015em]', className)} {...props} />,
  h4: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h4 className={cn('uppercase mt-8 text-neutral-500 mb-2 text-xl font-semibold tracking-[-0.015em]', className)} {...props} />,
  h5: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h5 className={cn('uppercase mt-4 text-neutral-500 mb-2 text-base font-semibold tracking-[-0.015em]', className)} {...props} />,
  p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('[&:not(:first-child)]:mb-6', className)} {...props} />,
  em: ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => <em className={cn('text-neutral-500 not-italic sm:text-xs', className)} {...props} />,
  strong: ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => <strong className={cn('px-[5px] py-[1px] sm:py-1 text-sm sm:text-xs font-mono text-neutral-200 bg-neutral-900 rounded border border-neutral-800', className)} {...props} />,

  ol: ({className, ...props}: React.HTMLAttributes<HTMLOListElement>) => <ol className={cn('mb-6 ml-4 list-decimal', className)} {...props} />,
  li: ({className, ...props}: React.HTMLAttributes<HTMLLIElement>) => <li className={cn('mt-2', className)} {...props} />,

  // eslint-disable-next-line @next/next/no-img-element
  img: ({className, ...props}: React.HTMLAttributes<HTMLImageElement>) => <img className={cn('pb-0.5 sm:pb-0 hover:scale-[1.015] sm:hover:scale-100 duration-500', className)} {...props} alt="Snable research image" />,
  a: ({href, children, ...props}: ComponentPropsWithoutRef<'a'>) => {
    const className = 'pb-[1px] text-neutral-500 border-b border-neutral-500 hover:border-transparent duration-200'
    if (href?.startsWith('/')) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      )
    }
    if (href?.startsWith('#')) {
      return (
        <a href={href} className={className} {...props}>
          {children}
        </a>
      )
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...props}>
        {children}
      </a>
    )
  },
  code: ({children, ...props}: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string)
    return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...props} />
  },
}
