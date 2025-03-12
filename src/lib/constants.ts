export const WEBSITE_PATHS = {
  socials: '/socials',
  research: '/research',
  changelog: '/changelog',
  teaser: '/teaser',
}

export const PROJECT_LINKS = {
  store: 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn',
  reviews: 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn/reviews',
  socials: 'https://snable.website/socials',
  github: 'https://github.com/bozzhik/snable',
  topic: 'https://github.com/topics/snable',
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
      to: PROJECT_LINKS.topic,
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
