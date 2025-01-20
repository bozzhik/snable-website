import {ArrowDownRight} from 'lucide-react'

const linksData = {
  1: {
    anchor: '#часть-1-веб-браузер',
    label: 'Веб-браузер',
  },
  2: {
    anchor: '#часть-2-расширения',
    label: 'Расширения',
  },
  3: {
    anchor: '#часть-3-продукт',
    label: 'Продукт',
  },
  4: {
    anchor: '#часть-4-бренд',
    label: 'Бренд',
  },
}

export default function AnchorLinks() {
  return (
    <div className="flex flex-wrap gap-6 sm:gap-x-4 sm:gap-y-2 w-fit">
      {Object.values(linksData).map((link, index) => (
        <a href={link.anchor} className="text-xl sm:text-lg flex items-end gap-0.5 text-neutral-500 group" key={index}>
          {link.label}

          <ArrowDownRight className="group-hover:rotate-[45deg] duration-300" strokeWidth={1.5} />
        </a>
      ))}
    </div>
  )
}
