import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Sidebar from './Sidebar'
import getFrontmatter from './getFrontmatter'
import {
  getImageFilesRecursively,
  copyImageToPublic,
  getColors,
  buildLink,
  isUrlAbsolute,
  setAnchorTargetProperty,
} from '@/app/utils'

const PageSidebar = async ({ slug, isSticky = true }: { slug?: string; isSticky?: boolean }) => {
  if (!slug) {
    return
  }

  const postFrontmatter = await getFrontmatter('posts')
  const sidebarFrontmatter = await getFrontmatter('sidebars')
  const sidebarData = sidebarFrontmatter.filter(
    fm => slug && fm.slug === slug.replaceAll('_', '-').replaceAll(' ', '-')
  )

  if (sidebarData.length) {
    const sidebarParameters = sidebarData[0]

    let pinnedPosts = []
    for (let i = 1; i < 10; i++) {
      if (sidebarParameters['pinnedPost' + i]) {
        const postData = postFrontmatter.filter(
          fm =>
            sidebarParameters['pinnedPost' + i] &&
            fm.slug === sidebarParameters['pinnedPost' + i].replaceAll('_', '-').replaceAll(' ', '-')
        )
        const frontmatter = postData[0]

        if (frontmatter) {
          pinnedPosts.push(frontmatter)
        }
      }
    }

    // To prevent hydration mismatch for Pinned Posts' classes, define constant here rather than inline
    const sidebarPinnedPostClasses = await getColors('text', 'SidebarPinnedPost')

    return (
      <Sidebar isSticky={isSticky}>
        <div className="text-sm leading-relaxed mb-24">
          {pinnedPosts.length > 0 && (
            <div className="mb-8">
              {pinnedPosts.map((frontmatter, index) => {
                return (
                  <div className="flex flex-wrap mb-3" key={`pinned-post-${index}`}>
                    <Image
                      src="/assets/thumbtack.svg"
                      alt="thumbtack icon"
                      width={32}
                      height={32}
                      className="-ml-7 opacity-80 h-5 w-5 dark:border-gray-600 p-0.5"
                    ></Image>
                    <div className="font-medium text-gray-600 dark:text-gray-300 my-auto pl-2">
                      <Link
                        className={`underline-animated hover:text-blue-700 dark:hover:text-blue-300 ${sidebarPinnedPostClasses}`}
                        href={`/blog/${frontmatter.slug}`}
                      >
                        {frontmatter.title}
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
            const heading = sidebarParameters['heading' + index]
            const image = sidebarParameters['image' + index]
            const text = sidebarParameters['text' + index]
            const link = sidebarParameters['link' + index]
            const linkText = sidebarParameters['linkText' + index]

            if (image) {
              const imageFiles = await getImageFilesRecursively('my_sidebars')
              const sidebarImageFile = imageFiles.filter(file => file.name === image)[0]

              if (sidebarImageFile) {
                const source = `${sidebarImageFile.path}/${sidebarImageFile.name}`

                copyImageToPublic(source, 'images/sidebar')
              }
            }

            if (heading || image || text || link || linkText) {
              return (
                <div
                  key={`sidebar-item-${index}`}
                  className={`sidebar-section ${await getColors('text', 'SidebarText', 'gray-300', 'gray-600')}`}
                >
                  {heading && (
                    <div className={`sidebar-heading ${await getColors('text', 'SidebarHeading')}`}>{heading}</div>
                  )}
                  {text && <div className="sidebar-body">{text}</div>}
                  {linkText && link && (
                    <Link
                      className={`font-normal duration-100 border-b border-dotted underline-animated ${await getColors('text', 'SidebarLinkText')} ${await getColors('hover:text', 'SidebarLinkTextHover')}`}
                      target={setAnchorTargetProperty(link)}
                      href={await buildLink(link)}
                    >
                      {linkText}
                    </Link>
                  )}
                  {!linkText && link && (
                    <Link
                      className={`font-normal duration-100 border-b border-dotted underline-animated ${await getColors('text', 'SidebarLinkText')} ${await getColors('hover:text', 'SidebarLinkTextHover')}`}
                      target={setAnchorTargetProperty(link)}
                      href={await buildLink(link)}
                    >
                      {link.replace('https://', '')}
                    </Link>
                  )}

                  {image && (
                    <Image
                      alt={`Sidebar image`}
                      src={`/images/sidebar/${image}`}
                      className="w-full h-auto object-cover mt-4 mb-6"
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 100vw, 24vw"
                    ></Image>
                  )}
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
