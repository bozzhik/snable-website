import {BOX_STYLES} from '~/Global/Container'

import {cn} from '@/lib/utils'
import {H2, H4} from '~/UI/Typography'

// const achievementsData = {
//   1: {
//     title: 'Organized Visual Insights',
//     caption: 'Gather, organize, and display key visual data. Dive deep with dedicated tabs for clarity.',
//     video: '/project.mp4',
//   },
//   2: {
//     title: 'Save Your Favorites',
//     caption: 'Love a look? Save favorite pages and visuals. Revisit your design ideas anytime.',
//     video: '/project.mp4',
//   },
//   3: {
//     title: 'Direct to Figma',
//     caption: 'Export analyzed visuals directly to Figma with a click. Streamline your workflow.',
//     video: '/project.mp4',
//   },
// }

const achievementsData = {
  1: {
    title: 'Quick Start Journey',
    caption: 'Discover Snable, install in moments. Gain instant insights on first interaction.', // Было 18 слов, стало 12 (-6)
  },
  2: {
    title: 'Your Daily Design Companion',
    caption: 'Essential for daily use. Easily grab page info and save vital visuals to favorites.', // Было 20 слов, стало 15 (-5)
  },
  3: {
    title: 'Seamless Workflow Integration',
    caption: 'Recommended and easily installed, Snable instantly exports analyzed data directly into Figma.', // Было 18 слов, стало 15 (-3)
  },
}

function AchievementsBlock({idx, title, caption}: {idx: string; title: string; caption: string}) {
  return (
    <div className={cn('flex flex-col items-center gap-10 sm:gap-6', BOX_STYLES.compact)}>
      <div className="space-y-3 text-center">
        <H2>{title}</H2>
        <H4 className="max-w-[50ch] mx-auto">{caption}</H4>
      </div>

      <div className="w-full h-[70vh] xl:h-[80vh] sm:h-[30vh] bg-black-card border-2 border-gray-medium rounded-2xl sm:rounded-xl overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={`/achievements/${idx}.mp4`} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default function Achievements() {
  return (
    <section data-section="achievements-index" className="flex flex-col gap-20">
      {Object.entries(achievementsData).map(([key, item]) => (
        <AchievementsBlock {...item} idx={key} key={key} />
      ))}
    </section>
  )
}
