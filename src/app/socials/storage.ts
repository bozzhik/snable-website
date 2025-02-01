export const LINKS = {
  telegram: 'https://t.me/bozzzzhik',
  habr: 'https://habr.com/ru/users/bozzhik/articles',
  x: 'https://x.com/bozzhik',
} as const

export type SocialSource = keyof typeof LINKS

export type SocialsItem = {
  source: SocialSource
  link: string
  content: string[]
}

export const ITEMS: SocialsItem[] = [
  {
    source: 'telegram',
    link: 'https://t.me/bozzzzhik/85',
    content: ['i wrote an article on Habr.ru about naive problem-solving in development. This topic has been on my mind since my first year of university—how inexperience in development can sometimes lead to unconventional solutions.', 'In the coming months, I plan to publish a series of articles on development, Chrome extensions, and everything related to my diploma project.'],
  },
  {
    source: 'telegram',
    link: 'https://t.me/bozzzzhik/83',
    content: ['i’ve finished working on the visual research for my diploma project. It was quite challenging, but creating the book turned out to be an interesting experience.'],
  },
  {
    source: 'x',
    link: 'https://x.com/bozzhik/status/1878468381222850865',
    content: ['in a few hours, I created a small chrome extension to dive into the process of publishing to the Chrome Web Store.', 'website aura extension reveals a website’s color palette, scheme, and visual mood, giving a snapshot of its design style.'],
  },
]
