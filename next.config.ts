import type {NextConfig} from 'next'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async redirects() {
    return [
      {
        source: '/archive',
        destination: 'https://bozzhik.com',
        permanent: true,
        basePath: false,
      },
      {
        source: '/store',
        destination: 'https://chromewebstore.google.com/detail/website-aura-color-analyz/hjlcegcjeflohbigndmpeldcdgdbcbbg',
        permanent: true,
        basePath: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/bozzhik',
        permanent: true,
        basePath: false,
      },
    ]
  },
}

const withMDX = createMDX({
  // Add markdown plugins here, if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
