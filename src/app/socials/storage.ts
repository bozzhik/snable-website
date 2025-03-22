export const SOCIALS = {
  x: 'https://x.com/bozzhik',
  medium: 'https://medium.com/@bozzhik',
  telegram: 'https://t.me/s/bozzzzhik',
  habr: 'https://habr.com/ru/users/bozzhik/articles',
} as const

export type SocialSource = keyof typeof SOCIALS

export type SocialsItem = {
  source: SocialSource
  link: string
  title?: string
  content: string[]
  image?: string // uploadthing.com
  video?: string // uploadthing.com
}

export const ITEMS: SocialsItem[] = [
  {
    source: 'telegram',
    link: 'https://t.me/bozzzzhik/87',
    video: 'https://cfjm6y1j7f.ufs.sh/f/WjxObGYK0fV5eoqYt0XzVqDcmU5J02ZRg1GstodP7a69CIXL',
    content: [`The diploma project is being actively promoted, and X is the most effective channel — it's responsible for the majority of the extension's traffic. Last night, an account with 200K followers reposted my content during a stream that attracted 7K viewers.`],
  },
  {
    source: 'x',
    link: 'https://x.com/bozzhik/status/1900693832091513241',
    image: 'https://cfjm6y1j7f.ufs.sh/f/WjxObGYK0fV5kSJmYirTIbDUPHYyXpiLWCRv3l6Nsua5wKnA',
    content: ['Achievement unlocked 🏆'],
  },
  {
    source: 'x',
    link: 'https://x.com/bozzhik/status/1891478314486816777',
    video: 'https://cfjm6y1j7f.ufs.sh/f/WjxObGYK0fV5pt1OMmTi8eLjrtVabkySWdKJ92z5QOFl4m1X',
    content: [`I've finished the visual research for my diploma project. It was quite challenging, but creating the book turned out to be an interesting experience.`],
  },
  {
    source: 'medium',
    link: 'https://medium.com/@bozzhik/naive-problem-solving-inexperience-can-be-an-advantage-e1826dddd7b8',
    image: 'https://cfjm6y1j7f.ufs.sh/f/WjxObGYK0fV5Yjyh7rGcIrOcFw4hqgEnlWbDo6TJYupkH1VN',
    title: 'Naive Problem Solving: Why Inexperience in Development Can Be an Advantage',
    content: ['Could inexperience be your secret weapon in development? Instead of always searching for ready-made solutions, what if we trusted our intuition and fundamentals to truly understand technology—a mindset that benefits both beginners and seasoned pros.'],
  },
  {
    source: 'x',
    link: 'https://x.com/bozzhik/status/1878468381222850865',
    video: 'https://cfjm6y1j7f.ufs.sh/f/WjxObGYK0fV5NEB4z0mVMOE9mxBQlNZW2efA5b0jkisFuwHp',
    content: ['in a few hours, I created a small chrome extension to dive into the process of publishing to the Chrome Web Store.', 'website aura extension reveals a website’s color palette, scheme, and visual mood, giving a snapshot of its design style.'],
  },
]
