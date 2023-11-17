import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'
import getFrontmatter from './getFrontmatter'
import Thumbtack from '../../public/assets/thumbtack.svg'
import { getImageFilesRecursively, copyImageToPublic } from '@/app/utils'

const PageSidebar = async ({slug, isSticky=true}: {slug: string, isSticky?: boolean}) => {
  const sidebarFrontmatter = await getFrontmatter('sidebars')
  const sidebarData = sidebarFrontmatter.filter(fm => fm.slug === slug)
  
  if (sidebarData.length) {
    const sidebarParameters = sidebarData[0]

    return (
      <Sidebar isSticky={isSticky}>
        <div className='text-sm leading-relaxed mb-20'>
          {(sidebarParameters.pinnedPost1 || sidebarParameters.pinnedPost2 || sidebarParameters.pinnedPost3) && 
            <div className="mb-8">
              {[1, 2, 3, 4].map(async (index: number) => {
                const postFrontmatter = await getFrontmatter('posts')
                const postData = postFrontmatter.filter(fm => fm.slug === sidebarParameters['pinnedPost' + index])
      
                if (postData.length) {
                  const frontmatter = postData[0]
                  return (
                    <div className="flex flex-wrap mb-3" key={`pinned-post-${index}`}>
                      <Image src={Thumbtack} alt="thumbtack icon" className="h-5 w-5 dark:border-gray-600 stroke-gray-200 fill-gray-200 p-0.5"></Image>
                      <div className="font-semibold text-gray-400 dark:text-gray-500 my-auto pl-2">Pinned post</div>
                      <div className="w-full font-normal text-gray-600 dark:text-gray-300">
                        <Link className="underline-animated hover:text-blue-700 dark:hover:text-blue-300" href={`/blog/${frontmatter.slug}`}>{frontmatter.title}</Link>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          }
  
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
            const heading = sidebarParameters['heading' + index]
            const image = sidebarParameters['image' + index]
            const text = sidebarParameters['text' + index]
            const link = sidebarParameters['link' + index]
            const linkText = sidebarParameters['linkText' + index]
  
            if ( image ) {
              const imageFiles = await getImageFilesRecursively('my_sidebars')
              const sidebarImageFiles = imageFiles.filter(file => file.name === image)
  
              if ( sidebarImageFiles ) {
                const imageFile = imageFiles.filter(file => file.name === image)[0]
                const source = `${imageFile.path}/${imageFile.name}`
          
                copyImageToPublic(source, 'sidebar_images')
              }
            }
  
            if ( heading || image || text || link || linkText ) {
              return (
                <div key={`sidebar-item-${index}`} className="font-light text-gray-600 dark:text-gray-300 mb-5">
                  {heading && <div className="font-semibold mb-0.5">{heading}</div>}
                  {text && <div className="mb-0.5">{text}</div>}
                  {linkText && link && <Link className="font-normal duration-100 underline-animated border-b border-dotted border-gray-500 hover:border-transparent" target="_blank" href={link}>{linkText}</Link>}
                  {!linkText && link && <Link className="font-normal duration-100 underline-animated border-b border-dotted border-gray-500 hover:border-transparent" target="_blank" href={link}>{link.replace('https://', '')}</Link>}

                  {image && <Image alt={`Sidebar image`} src={`/sidebar_images/${image}`} className="w-full h-auto object-cover mt-2 mb-3" width={0} height={0} sizes="100vw"></Image>}
                </div>
              )
            }
          })}
        </div>
      </Sidebar>
    )
  }

}

export default PageSidebar
