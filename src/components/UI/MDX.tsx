import {cn} from '@/lib/utils'

export const MDX = {
  h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('mb-8 text-3xl text-neutral-500 font-semibold tracking-tighter', className)} {...props} />,
  h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('mt-8 text-neutral-500 mb-4 text-3xl font-semibold tracking-tight', className)} {...props} />,
  p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('[&:not(:first-child)]:mt-5', className)} {...props} />,
}
