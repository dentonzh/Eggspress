import React from 'react'
import compileContent from '../../../_components/compileContent'
import getFrontmatter from '../../../_components/getFrontmatter'
import getSlugs from '../../../_components/getSlugs'
import Sidebar from '../../../_components/Sidebar'
import PostCard from '../../../_components/PostCard'
import ContentHero from '../../../_components/ContentHero'
import PaginationCard from '../../../_components/PaginationCard'
import { copyImageToPublic, getImageFilesRecursively, getEggspressSettings } from '../../../utils'
import Image from 'next/image'


export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const slugs = await getSlugs('authors')

  let params: {slug: string, page: string}[] = []

  slugs.map(({slug}) => {
    const filteredPosts = postFrontmatter.filter(fm => fm.author === slug || fm.author?.split(',').map(x => x.trim()).includes(slug))

    const postCount = filteredPosts.length
    const pageCount = Math.ceil(postCount / (appearanceSettings.numberOfPostsPerPage || 8))

    for (let i = 0; i < pageCount; i ++) {
      params.push({slug: slug, page: (+i + 1).toString()})
    }
  })

  return params
}


export async function generateMetadata({ params }: { params: {slug: string, page: string} }) {
  const { slug, page } = params
  const { frontmatter, images } = await compileContent('authors', slug)
  const blogSettings = await getEggspressSettings('metadata')
  const pageNumber = parseInt(page)


  return {
    title: `Page ${pageNumber} - ${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
    description: frontmatter.description || frontmatter.snippet,
    url: `/author/${slug}/${pageNumber}`,
    openGraph: {
      title: `Page ${pageNumber} - ${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
      description: frontmatter.description || frontmatter.snippet,
      url: `/author/${slug}/${pageNumber}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images
    }
  }
}


const getProfileImage =  async (imageFileName: string): Promise<string | null> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFile = imageFiles.filter(file => file.name === imageFileName)[0]

  if (profileImageFile) {
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageSrc = copyImageToPublic(source, 'images/profile')
    return imageSrc
  } else {
    return ''
  }
}


const AuthorPaginatedPage =  async ( {params}: {params: {slug: string, page: string}} ) => {
  const { slug, page } = params
  const { content, frontmatter, contentLength } = await compileContent('authors', slug)

  const postFrontmatter = await getFrontmatter('posts', frontmatter && frontmatter.orderPostsBy, frontmatter && frontmatter.orderPostsByReversed)
  const filteredPosts = postFrontmatter.filter(fm => fm.author === slug || fm.author?.split(',').map(x => x.trim()).includes(slug))

  const imageSrc = frontmatter && frontmatter.image ? await getProfileImage(frontmatter.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')

  const sections = ['pronouns', 'location', 'education', 'degree', 'work', 'company', 'title', 'specialty', 'team']

  const pageNumber = parseInt(page)
  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8

  const endIndex = pageNumber * numPostsPerPage > filteredPosts.length ? filteredPosts.length : pageNumber * numPostsPerPage
  const startIndex = pageNumber * numPostsPerPage - numPostsPerPage > filteredPosts.length ? endIndex - numPostsPerPage : pageNumber * numPostsPerPage - numPostsPerPage
  if (!frontmatter) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={`${frontmatter.name}${frontmatter.postnomials ? ' ' + frontmatter.postnomials : ''}` || slug}
        subtitle={`// Page ${pageNumber}`}
        subheading={frontmatter.role}
        sectionString={frontmatter.description}
        imageSrc={imageSrc}
        imageAlt={`Profile image for ${frontmatter.name}`}
      ></ContentHero>
      
      <div className="flex flex-wrap">
        <div className="max-w-prose">
          {filteredPosts &&
            <div className="max-w-prose">

              {postFrontmatter.slice(startIndex, endIndex).map((post, index) => 
                <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
              )}
              
            </div>
          }

          {contentLength > 0 && (
            <div className="py-12 border-t">
              <h2 className="text-gray-600 dark:text-gray-200 font-semibold mb-3">Biography</h2>
              <div className="prose dark:prose-invert">
                {content}
              </div>
            </div>
          )}
        </div>

        <Sidebar>
          {sections.map((section, index) => {return (frontmatter[section] &&
            <div>
              <div key={`${section}-${index}`} className="text-sm text-gray-500 w-full mb-3">
                <h4 className="font-semibold mb-0.5">{section ? section.charAt(0).toUpperCase() + section.slice(1) : ''}</h4>
                <div className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                  {frontmatter[section]}
                </div>
              </div>
            </div>
          )})}

          {[1, 2].map(index => {return (frontmatter['socialLink' + index] &&
            <div key={`${frontmatter['socialLink' + index]}-${index}`} className="text-sm text-gray-500 w-full mb-3">
              <div>
                <h4 className="font-semibold mb-0.5">{frontmatter['socialPlatform' + index] ? `${frontmatter['socialPlatform' + index]}` : 'Social'}</h4>
                <a href={frontmatter['socialLink' + index]} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
                  {frontmatter['socialHandle' + index] ? `@${frontmatter['socialHandle' + index].replace('@', '')}` : ''}
                  {!frontmatter['socialHandle' + index] ? frontmatter['socialLink' + index].slice(frontmatter['socialLink' + index].lastIndexOf('://')+3) : '' }
                </a>
              </div>
            </div>
          )})}
          
          {frontmatter.websiteLink && (
            <div>
              <div className="text-sm text-gray-500 w-full mb-3">
                <h4 className="font-semibold mb-0.5">Website</h4>
                <a href={frontmatter.websiteLink} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
                  {frontmatter.websiteLink && frontmatter.websiteName ? frontmatter.websiteName : frontmatter.websiteLink.slice(frontmatter.websiteLink.lastIndexOf('://')+3)}
                </a>
              </div>
            </div>
          )}
        </Sidebar>

        {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) &&
            <PaginationCard currentPage={pageNumber} startIndex={startIndex} endIndex={endIndex} postCount={filteredPosts.length} type="author" slug={slug}></PaginationCard>
          }
      </div>
    </div>
  )
}

export default AuthorPaginatedPage