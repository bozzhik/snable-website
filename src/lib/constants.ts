export const PROJECT_LINKS = {
  store: 'https://chromewebstore.google.com/detail/snable-ui-inspector-css-s/gahcgpjomnmmmpimaodmdbaappflalkn',
  github: 'https://github.com/bozzhik/snable',
  socials: 'https://snable.website/socials',
}

export const HEADER_DATA = {
  LINKS: {
    // about: 'About',
    socials: 'Follow Us',
    research: 'Research',
  },
  MOBILE_LINKS: {
    1: {
      label: 'Github',
      to: PROJECT_LINKS.github,
      disabled: false,
    },
    2: {
      label: 'Web Store',
      to: PROJECT_LINKS.store,
      disabled: 'true',
    },
  },
  ACTION: {
    1: {
      // label: 'Get Notified',
      to: '/#form',
      variant: 'solid',
    },
  },
} as const
