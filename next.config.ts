import type {NextConfig} from 'next'
import {PROJECT_LINKS} from '@/lib/constants'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/archive',
        destination: PROJECT_LINKS.socials,
        permanent: true,
        basePath: false,
      },
      {
        source: '/store',
        destination: PROJECT_LINKS.store,
        permanent: true,
        basePath: false,
      },
      {
        source: '/github',
        destination: PROJECT_LINKS.github,
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
