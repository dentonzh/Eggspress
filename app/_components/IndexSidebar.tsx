import React from 'react'
import Link from 'next/link'
import Sidebar from './Sidebar'
import { getEggspressSettings } from '@/app/utils'

const IndexSidebar = async () => {
  const sidebarSettings = await getEggspressSettings('sidebar')

  return (
    <Sidebar>
      <div className='text-sm leading-relaxed'>
      {[...Array(9).keys()].map((index: number) => {
        const heading = sidebarSettings['heading' + index]
        const image = sidebarSettings['image' + index]
        const text = sidebarSettings['text' + index]
        const link = sidebarSettings['link' + index]
        const linkText = sidebarSettings['linkText' + index]

        if ( heading || image || text || link || linkText ) {
          return (
            <div key={`sidebar-item-${index}`} className="font-light text-gray-500 dark:text-gray-400 mb-3">
              {heading && <div className="font-semibold text-gray-500 dark:text-gray-300">{heading}</div>}
              {image && <div className="">{image}</div>}
              {text && <div className="">{text}</div>}
              {linkText && link && <Link target="_blank" href={link}>{linkText}</Link>}
              {!linkText && link && <Link target="_blank" href={link}>{link.replace('https://', '')}</Link>}
            </div>
          )
        }
      }
        
      )}
      </div>
    </Sidebar>
  )
}

export default IndexSidebar