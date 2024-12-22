import {cn} from '@/lib/utils'

const components = {
  h1: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h1 className={cn('mt-12 text-green-300 mb-6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl', className)} {...props} />,
  h2: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h2 className={cn('mt-10 text-red-400 mb-4 scroll-m-20 text-3xl font-semibold tracking-tight', className)} {...props} />,
  h3: ({className, ...props}: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className={cn('mt-8 text-blue-300 mb-4 scroll-m-20 text-2xl font-semibold tracking-tight', className)} {...props} />,
  p: ({className, ...props}: React.HTMLAttributes<HTMLParagraphElement>) => <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)} {...props} />,
  ul: ({className, ...props}: React.HTMLAttributes<HTMLUListElement>) => <ul className={cn('my-6 ml-6 list-disc', className)} {...props} />,
  ol: ({className, ...props}: React.HTMLAttributes<HTMLOListElement>) => <ol className={cn('my-6 ml-6 list-decimal', className)} {...props} />,
  li: ({className, ...props}: React.HTMLAttributes<HTMLLIElement>) => <li className={cn('mt-2', className)} {...props} />,
  blockquote: ({className, ...props}: React.HTMLAttributes<HTMLQuoteElement>) => <blockquote className={cn('mt-6 border-l-2 border-primary pl-6 italic', className)} {...props} />,
  code: ({className, ...props}: React.HTMLAttributes<HTMLElement>) => <code className={cn('relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm', className)} {...props} />,
}

export default components
