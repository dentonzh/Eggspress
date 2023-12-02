import React from 'react'
import compileContent from '../../_components/compileContent'
import getFrontmatter from '../../_components/getFrontmatter'
import getSlugs from '../../_components/getSlugs'
import Sidebar from '../../_components/Sidebar'
import PostCard from '../../_components/PostCard'
import ContentHero from '../../_components/ContentHero'
import { copyImageToPublic, getImageFilesRecursively, getEggspressSettings } from '../../utils'
import Image from 'next/image'
import egg from '@/public/assets/egg.svg'
import PaginationLink from '@/app/_components/PaginationLink'


export async function generateStaticParams() {
  const slugs = getSlugs('authors')
  return slugs
}


export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { frontmatter, images } = await compileContent('authors', slug)
  const blogSettings = await getEggspressSettings('metadata')


  return {
    title: `${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,  // add role here? like "Eggie Shellvetica, Editor-in-Chief at ..."
    description: frontmatter.description || frontmatter.snippet,
    url: `/author/${slug}`,
    openGraph: {
      title: `${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
      description: frontmatter.description || frontmatter.snippet,
      url: `/author/${slug}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images
    }
  }
}

const getProfileImage =  async (imageFileName: string): Promise<string> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFile = imageFiles.filter(file => file.name === imageFileName)[0]

  if (profileImageFile) {
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageSrc = copyImageToPublic(source, 'images/profile')
    return imageSrc || ''
  } else {
    return ''
  }
}


const AuthorPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter, contentLength } = await compileContent('authors', slug)

  const postFrontmatter = await getFrontmatter('posts', frontmatter && frontmatter.orderPostsBy, frontmatter && frontmatter.orderPostsByReversed)
  const filteredPosts = postFrontmatter.filter(fm => fm.author === slug || fm.author?.split(',').map(x => x.trim()).includes(slug))

  const imageSrc = frontmatter && frontmatter.image ? await getProfileImage(frontmatter.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')

  const sections = ['pronouns', 'location', 'education', 'degree', 'work', 'company', 'title', 'specialty', 'team']

  if (!frontmatter) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={frontmatter.name || slug}
        subtitle={frontmatter.postnomials}
        subheading={frontmatter.role || 'Author'}
        sectionString={frontmatter.description}
        imageSrc={imageSrc}
        imageAlt={`Profile image for ${frontmatter.name}`}
      >
      </ContentHero>
      
      <div className="flex flex-wrap">
        <div className="max-w-prose">
          {filteredPosts &&
            <div className="max-w-prose">

              {filteredPosts.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((post, index) => 
                <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
              )}
              {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) &&
                <div className="py-12">
                  <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
                    {appearanceSettings.paginatedSubheadingIndexPrefix}1 - {appearanceSettings.numberOfPostsPerPage || 8}{appearanceSettings.paginatedSubheadingTotalPrefix}{filteredPosts.length}
                  </div>
                  <PaginationLink text="Show more posts" page={2} type="author" slug={slug}></PaginationLink>
                </div>
              }
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
      </div>
    </div>
  )
}

export default AuthorPage