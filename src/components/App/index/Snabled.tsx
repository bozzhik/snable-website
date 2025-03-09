import {cn, cleanUrl} from '@/lib/utils'
import {H5, P} from '~/UI/Typography'

export default function Snabled() {
  return (
    <section data-section="snabled-index" className={cn('mt-24', 'relative w-full flex gap-3 justify-center overflow-hidden')}>
      {['example-1', 'example-2', 'example-3', 'example-4', 'example-5'].map((tab, idx) => (
        <a href={tab} className={cn('group p-2 pr-2.5 flex items-center gap-2.5', 'bg-black-light border border-gray-medium rounded-xl', 'duration-300 hover:bg-black hover:border-gray-medium/70')} target="_blank" rel="noopener noreferrer" key={idx}>
          <div className="relative flex-shrink-0 rounded-lg size-11 bg-gray"></div>

          <div className="flex-grow min-w-0 ">
            <H5 className="leading-[1.25] duration-300 group-hover:text-gray">{tab}</H5>
            <P className="font-mono text-xs truncate text-gray">{cleanUrl(`https://${tab}.com`)}</P>
          </div>
        </a>
      ))}
    </section>
  )
}
