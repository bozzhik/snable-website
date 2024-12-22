import Image from 'next/image'
import type {MDXComponents} from 'mdx/types'
import {highlight} from 'sugar-high'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({children}: {children: React.ReactNode}) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({children}: {children: React.ReactNode}) => <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>,
    h3: ({children}: {children: React.ReactNode}) => <h3 className="text-2xl font-medium mt-4 mb-2">{children}</h3>,
    p: ({children}: {children: React.ReactNode}) => <p className="my-2">{children}</p>,
    img: (props) => <Image {...props} width={600} height={400} className="my-4" loading="lazy" alt={props.alt || 'Image'} />,
    code: ({children}: {children: React.ReactNode}) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{__html: codeHTML}} />
    },
    ...components,
  }
}
