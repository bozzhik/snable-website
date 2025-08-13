export const WEBSITE_PATHS = {
  socials: '/socials',
  research: '/research',
  changelog: '/changelog',
  teaser: '/teaser',
}

export const PROJECT_LINKS = {
  socials: 'https://snable.website/socials',
  github: 'https://github.com/bozzhik/snable',
  code: 'https://github.com/topics/snable',

  reviews: 'https://chromewebstore.google.com/detail/gahcgpjomnmmmpimaodmdbaappflalkn/reviews',
  mvp: 'https://chromewebstore.google.com/detail/hjlcegcjeflohbigndmpeldcdgdbcbbg',

  extension: 'https://chromewebstore.google.com/detail/gahcgpjomnmmmpimaodmdbaappflalkn',
  figma_plugin: 'https://www.figma.com/community/plugin/1507707678099986490',
  figma_plugin_guide: 'https://x.com/bozzhik/status/1941531211698143371',
}

export const HEADER_DATA = {
  LINKS: [
    {
      label: 'Follow Us',
      to: WEBSITE_PATHS.socials,
      external: false,
    },
    {
      label: 'Research',
      to: WEBSITE_PATHS.research,
      external: false,
    },
    {
      label: 'Changelog',
      to: WEBSITE_PATHS.changelog,
      external: false,
    },
    {
      label: 'Source Code',
      to: PROJECT_LINKS.code,
      external: true,
    },
    {
      label: 'Figma Plugin',
      to: PROJECT_LINKS.figma_plugin,
      external: true,
    },
  ],
  MOBILE_LINKS: [
    {
      label: 'Web Store',
      to: PROJECT_LINKS.extension,
      external: true,
    },
  ],
} as const
