import {cn} from '@/lib/utils'

import {ComponentPropsWithoutRef} from 'react'
import {highlight} from 'sugar-high'

export const MDX = {
  h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('mb-10 text-3xl text-neutral-500 font-semibold tracking-tighter', className)} {...props} />,
  h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('uppercase mt-10 text-neutral-500 mb-4 text-3xl font-semibold tracking-tight', className)} {...props} />,
  h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('uppercase mt-10 text-neutral-500 mb-4 text-2xl font-semibold tracking-[-0.015em]', className)} {...props} />,
  p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('[&:not(:first-child)]:mb-6', className)} {...props} />,
  em: ({className, ...props}: React.HTMLAttributes<HTMLSpanElement>) => <em className={cn('text-neutral-500 not-italic font-mono', className)} {...props} />,

  // eslint-disable-next-line @next/next/no-img-element
  img: ({className, ...props}: React.HTMLAttributes<HTMLImageElement>) => <img className={cn('pb-0.5', className)} {...props} alt="Snable research image" />,
  a: ({href, children, ...props}: ComponentPropsWithoutRef<'a'>) => {
    const className = 'pb-[1px] duration-200 border-b border-neutral-500 hover:border-transparent'
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
