'use client'

import {MDXProvider} from '@mdx-js/react'
import {useMDXComponents} from './mdx-components'
// import components from './components'
import Content from './content.mdx'

export default function ResearchBody() {
  const components = useMDXComponents({})

  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  )
}
