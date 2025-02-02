export const LINKS = {
  x: 'https://x.com/bozzhik',
  medium: 'https://medium.com/@bozzhik',
  telegram: 'https://t.me/s/bozzzzhik',
  habr: 'https://habr.com/ru/users/bozzhik/articles',
} as const

export type SocialSource = keyof typeof LINKS

export type SocialsItem = {
  source: SocialSource
  link: string
  title?: string
  content: string[]
  image?: string
  video?: string
}

export const ITEMS: SocialsItem[] = [
  {
    source: 'habr',
    link: 'https://habr.com/ru/articles/878590/',
    image: '/socials/telegram-85.jpg',
    title: 'Naive Problem Solving: Why Inexperience in Development Can Be an Advantage',
    content: ['Could inexperience be your secret weapon in development? Instead of always searching for ready-made solutions, what if we trusted our intuition and fundamentals to truly understand technology—a mindset that benefits both beginners and seasoned pros.'],
  },
  {
    source: 'telegram',
    link: 'https://t.me/bozzzzhik/83',
    video: '/socials/telegram-83.mp4',
    content: ['i’ve finished working on the visual research for my diploma project. It was quite challenging, but creating the book turned out to be an interesting experience.'],
  },
  {
    source: 'x',
    link: 'https://x.com/bozzhik/status/1878468381222850865',
    video: '/socials/x-1878468381222850865.mp4',
    content: ['in a few hours, I created a small chrome extension to dive into the process of publishing to the Chrome Web Store.', 'website aura extension reveals a website’s color palette, scheme, and visual mood, giving a snapshot of its design style.'],
  },
]
