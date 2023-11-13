import React from 'react'
import compileContent from '../../_components/compileContent'
import getFrontmatter from '../../_components/getFrontmatter'
import getSlugs from '../../_components/getSlugs'
import Sidebar from '../../_components/Sidebar'
import PostCard from '../../_components/PostCard'
import { copyImageToPublic, getImageFilesRecursively, getEggspressSettings } from '../../utils'
import Image from 'next/image'


export async function generateStaticParams() {
  const slugs = getSlugs('authors')
  return slugs
}


export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { frontmatter, images } = await compileContent('authors', slug)
  const blogSettings = await getEggspressSettings('metadata')


  return {
    title: `${frontmatter.name} - ${blogSettings.title}`,  // add role here? like "Eggie Shellvetica, Editor-in-Chief at ..."
    description: frontmatter.description || frontmatter.snippet,
    url: `/${slug}`,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.snippet,
      url: `/${slug}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images
    }
  }
}


const getProfileImage =  async (imageFileName: string): Promise<string> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFiles = imageFiles.filter(file => file.name === imageFileName)

  if (profileImageFiles.length) {
    const profileImageFile = profileImageFiles[0]
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageUrl = copyImageToPublic(source, 'profile_images')
    return imageUrl
  } else {
    return ''
  }
}


const AuthorPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter, contentLength } = await compileContent('authors', slug)
  const postFrontmatter = await getFrontmatter('posts')

  const imageUrl = frontmatter && frontmatter.image ? await getProfileImage(frontmatter.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')

  if (!frontmatter) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <div className="flex flex-wrap">
          <div className="my-auto">
            <div className="mb-3">Author Profile</div>
            <h1 className="text-5xl font-bold mb-4 -ml-0.5">{frontmatter.name}</h1>   
            <div className="font-normal">{frontmatter.role}</div>
          </div>
          {imageUrl.length > 0 && (
            <div className={`${imageUrl.length ? '' : 'hidden'} ml-auto mr-2 h-24 w-24 border-2 border-blue-400 dark:border-blue-200 rounded-full object-cover overflow-hidden`}>
              <Image src={imageUrl} width="96" height="96" alt={`Profile image for ${frontmatter.name}`}></Image>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="max-w-prose">
          <h2 className="text-gray-600 font-semibold mb-3">Latest posts</h2>
          {postFrontmatter.filter(fm => fm.author === slug).map(fm =>
            <PostCard key={fm.slug} post={fm}></PostCard>
          )}
        </div>
        <Sidebar>
          <div className="font-semibold mb-3 text-gray-600">{frontmatter.name}</div>   
          {[1, 2].map(index => {return (frontmatter['socialLink' + index] &&
            <div key={`social-index`} className="text-sm text-gray-500 w-full mb-3">
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
              <div key={`social-index`} className="text-sm text-gray-500 w-full mb-3">
                <h4 className="font-semibold mb-0.5">Website</h4>
                <a href={frontmatter.websiteLink} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
                  {frontmatter.websiteLink && frontmatter.websiteName ? frontmatter.websiteName : frontmatter.websiteLink.slice(frontmatter.websiteLink.lastIndexOf('://')+3)}
                </a>
              </div>
            </div>
          )}
          {['location', 'education', 'work'].map(section => {return (frontmatter[section] &&
            <div>
              <div key={`social-index`} className="text-sm text-gray-500 w-full mb-3">
                <h4 className="font-semibold mb-0.5">{section.charAt(0).toUpperCase() + section.slice(1)}</h4>
                <div className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300">
                  {frontmatter[section]}
                </div>
              </div>
            </div>
          )})}
        </Sidebar>
        {contentLength > 0 && (
          <div className="py-12 border-t max-w-prose">
            <h2 className="text-gray-600 font-semibold mb-3">Biography</h2>
            <div className="prose dark:prose-invert">
              {content}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthorPage