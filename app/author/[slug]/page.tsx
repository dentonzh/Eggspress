import React from 'react'
import getFrontmatter from '../../_components/getFrontmatter'
import getAuthorSlugs from '../../_components/getAuthorSlugs'
import { copyImageToPublic, getImageFilesRecursively, getEggspressSettings } from '../../utils'
import Image from 'next/image'


export async function generateStaticParams() {
  const slugs = getAuthorSlugs()
  return slugs
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
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => {return frontmatter.slug === slug})[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')

  if (!authorData) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        {/* {frontmatter.category && <Link href={`/${createSlug(frontmatter.category)}`}><div className="mb-3">{frontmatter.category}</div></Link>}
      <div>{frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''}</div> */}
        <div className="flex flex-wrap">
          <div className="my-auto">
            <div className="mb-3">Author</div>
            <h1 className="text-5xl font-bold mb-3 -ml-0.5">{authorData.name}</h1>   
            <div className="font-normal">{authorData.role}</div>
          </div>
          {imageUrl.length > 0 && (
            <div className={`${imageUrl.length ? '' : 'hidden'} ml-auto mr-2 h-24 w-24 border-2 border-blue-400 dark:border-blue-200 rounded-full object-cover overflow-hidden`}>
              <Image src={imageUrl} width="96" height="96" alt={`Profile image for ${authorData.name}`}></Image>
            </div>

          )}
        </div>
      </div>
      <div className="py-2 mb-1">
        {authorData ? authorData.description : ''}
      </div>
      {authorData.socialLink && (
        <div className="text-sm text-gray-500 w-full mb-1">
          <span>
            {authorData.socialPlatform && authorData.socialHandle ? `${authorData.socialPlatform}: ` : 'Social: '}
          </span>
          <a href={authorData.socialLink} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
            {authorData.socialPlatform && authorData.socialHandle ? `@${authorData.socialHandle.replace('@', '')}` : authorData.socialPlatform}
            {(!authorData.socialPlatform || !authorData.socialPlatform.length) ? authorData.socialLink.slice(authorData.socialLink.lastIndexOf('://')+3) : '' }
          </a>
        </div>
      )}
      {authorData.websiteLink && (
        <div className="text-sm w-full text-gray-500 mb-1">
          <span className="pr-1">
            Website:
          </span>
          <a href={authorData.websiteLink} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
            {authorData.websiteLink && authorData.websiteName ? authorData.websiteName : authorData.websiteLink.slice(authorData.websiteLink.lastIndexOf('://')+3)}
          </a>
        </div>
      )}
      

    </div>
  )
}

export default AuthorPage