import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'
import getFrontmatter from './getFrontmatter'
import Thumbtack from '../../public/assets/thumbtack.svg'
import { getEggspressSettings, getImageFilesRecursively, copyImageToPublic } from '@/app/utils'

const IndexSidebar = async () => {
  const sidebarSettings = await getEggspressSettings('sidebar')

  return (
    <Sidebar>
      <div className='text-sm leading-relaxed'>
        {[...Array(4).keys()].map(async (index: number) => {
          const postFrontmatter = await getFrontmatter('posts')
          const postData = postFrontmatter.filter(fm => fm.slug === sidebarSettings['pinnedPost' + index])

          if (postData.length) {
            const frontmatter = postData[0]
            return (
              <div className="flex flex-wrap mb-3" key={`pinned-post-${index}`}>
                <Image src={Thumbtack} alt="thumbtack icon" className="h-5 w-5 dark:border-gray-600 stroke-gray-200 fill-gray-200 p-0.5"></Image>
                <div className="font-semibold text-gray-400 dark:text-gray-500 my-auto pl-2">Pinned post</div>
                <div className="w-full font-medium text-gray-600 dark:text-gray-400">
                  <Link className="hover:text-blue-700 dark:hover:text-blue-300" href={`/blog/${frontmatter.slug}`}>{frontmatter.title}</Link>
                </div>
              </div>
            )
          }
        })}

        {[...Array(10).keys()].map(async (index: number) => {
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
        })}
      </div>
    </Sidebar>
  )
}

export default IndexSidebar