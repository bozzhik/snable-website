import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
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

export default nextConfig
