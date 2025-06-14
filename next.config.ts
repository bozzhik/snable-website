import type {NextConfig} from 'next'
import {PROJECT_LINKS} from '@/lib/constants'

const nextConfig: NextConfig = {
  experimental: {
    dynamicIO: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'cfjm6y1j7f.ufs.sh',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
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
      {
        source: '/reviews',
        destination: PROJECT_LINKS.reviews,
        permanent: true,
        basePath: false,
      },
      {
        source: '/extension',
        destination: PROJECT_LINKS.store,
        permanent: true,
        basePath: false,
      },
      {
        source: '/figma',
        destination: PROJECT_LINKS.figma,
        permanent: true,
        basePath: false,
      },
      {
        source: '/mvp',
        destination: PROJECT_LINKS.mvp,
        permanent: true,
        basePath: false,
      },
      {
        source: '/code',
        destination: PROJECT_LINKS.code,
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
