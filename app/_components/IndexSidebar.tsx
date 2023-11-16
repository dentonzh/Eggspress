import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'
import { getEggspressSettings, getImageFilesRecursively, copyImageToPublic } from '@/app/utils'

const IndexSidebar = async () => {
  const sidebarSettings = await getEggspressSettings('sidebar')

  return (
    <Sidebar>
      <div className='text-sm leading-relaxed'>
        {[...Array(9).keys()].map(async (index: number) => {
          const heading = sidebarSettings['heading' + index]
          const image = sidebarSettings['image' + index]
          const text = sidebarSettings['text' + index]
          const link = sidebarSettings['link' + index]
          const linkText = sidebarSettings['linkText' + index]

          if ( image ) {
            const imageFiles = await getImageFilesRecursively('my_settings')
            const sidebarImageFiles = imageFiles.filter(file => file.name === image)

            if ( sidebarImageFiles ) {
              const imageFile = imageFiles.filter(file => file.name === image)[0]
              const source = `${imageFile.path}/${imageFile.name}`
        
              copyImageToPublic(source, 'sidebar_images')
            }
          }

          if ( heading || image || text || link || linkText ) {
            return (
              <div key={`sidebar-item-${index}`} className="font-light text-gray-500 dark:text-gray-400 mb-3">
                {heading && <div className="font-semibold text-gray-500 dark:text-gray-300">{heading}</div>}
                {text && <div className="">{text}</div>}
                {linkText && link && <Link target="_blank" href={link}>{linkText}</Link>}
                {!linkText && link && <Link target="_blank" href={link}>{link.replace('https://', '')}</Link>}
                {image && <Image alt={`Sidebar image`} src={`/sidebar_images/${image}`} className="w-full h-auto object-cover mt-2 mb-3" width={0} height={0} sizes="100vw"></Image>}
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