import React from 'react'
import getFrontmatter from './getFrontmatter'
import { copyImageToPublic, getImageFilesRecursively } from '../utils'
import Image from 'next/image'
import Link from 'next/link'

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


const AuthorCard = async ({slug}: {slug: string | null}) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => {return frontmatter.slug === slug})[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''

  if (!authorData) {
    return
  }

  return (
    <div className="mb-16 text-gray-700 dark:text-gray-200">
      <Link href={`/author/${slug}`} className="mb-2 flex flex-wrap">
        {imageUrl.length > 0 && (
          <div className={`${imageUrl.length ? '' : 'hidden'} -ml-1 mr-2 h-14 w-14 border-2 border-blue-400 dark:border-blue-200 rounded-full object-cover overflow-hidden`}>
            <Image src={imageUrl} width="56" height="56" alt={`Profile image for ${authorData.name}`}></Image>
          </div>

        )}
        <div className="font-medium my-auto">
          {authorData ? authorData.name : ''}
          {authorData.role && (<div className="text-xs">{authorData.role}</div>)}
        </div>
      </Link>
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

export default AuthorCard