import {ArrowDownRight} from 'lucide-react'

const linksData = {
  1: {
    anchor: '#part-1-web-browser',
    label: 'Web Browser',
  },
  2: {
    anchor: '#part-2-extensions',
    label: 'Extensions',
  },
  3: {
    anchor: '#part-3-product',
    label: 'Product',
  },
  4: {
    anchor: '#part-4-brand',
    label: 'Brand',
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
