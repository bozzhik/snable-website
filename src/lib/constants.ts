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

  store: 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn',
  reviews: 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn/reviews',

  figma: 'https://www.figma.com/community/plugin/1507707678099986490',
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
      to: PROJECT_LINKS.figma,
      external: true,
    },
  ],
  MOBILE_LINKS: [
    {
      label: 'Web Store',
      to: PROJECT_LINKS.store,
      external: true,
    },
  ],
} as const
