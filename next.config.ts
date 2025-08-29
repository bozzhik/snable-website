import type {NextConfig} from 'next'
import {PROJECT_LINKS} from '@/lib/constants'

const nextConfig: NextConfig = {
  experimental: {
    useCache: true,
    cacheComponents: true,
  },
  images: {
    remotePatterns: [
      // {
      //   hostname: 'cfjm6y1j7f.ufs.sh',
      // },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/store',
        destination: PROJECT_LINKS.extension,
        permanent: true,
        basePath: false,
      },
      {
        source: '/archive',
        destination: PROJECT_LINKS.socials,
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
        source: '/code',
        destination: PROJECT_LINKS.code,
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
        source: '/mvp',
        destination: PROJECT_LINKS.mvp,
        permanent: true,
        basePath: false,
      },
      {
        source: '/extension',
        destination: PROJECT_LINKS.extension,
        permanent: true,
        basePath: false,
      },
      {
        source: '/figma-plugin',
        destination: PROJECT_LINKS.figma_plugin,
        permanent: true,
        basePath: false,
      },
      {
        source: '/figma', // (plugin)
        destination: '/figma-plugin',
        permanent: true,
        basePath: false,
      },
      {
        source: '/figma-plugin-guide',
        destination: PROJECT_LINKS.figma_plugin_guide,
        permanent: true,
        basePath: false,
      },
    ]
  },
}

export default nextConfig
