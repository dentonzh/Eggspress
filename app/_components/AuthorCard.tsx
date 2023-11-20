import React from 'react'
import getFrontmatter from './getFrontmatter'
import { copyImageToPublic, getImageFilesRecursively } from '../utils'
import Image from 'next/image'
import Link from 'next/link'

const getProfileImage =  async (imageFileName: string): Promise<string> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFiles = imageFiles.filter(file => file.name === imageFileName)

  if (profileImageFiles.length) {
    const imageFile = profileImageFiles[0]
    const source = `${imageFile.path}/${imageFile.name}`
    const imageUrl = copyImageToPublic(source, 'profile_images')
    return imageUrl
  } else {
    return ''
  }
}

const AuthorCard = async ({slug}: {slug: string | null}) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => frontmatter.slug === slug)[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''

  if (!authorData) {
    return
  }

  return (
    <div className="mb-16 text-gray-600 dark:text-gray-200">
      <Link href={`/author/${slug}`} className="mb-1 flex flex-wrap">
        {imageUrl.length > 0 ? (
          <div className={`${imageUrl.length ? '' : 'hidden'} -ml-2 mr-3 h-11 w-11 rounded-full object-cover overflow-hidden`}>
            <Image src={imageUrl} width="56" height="56" alt={`Profile image for ${authorData.name}`}></Image>
          </div>
        ) :
          <div className="-ml-2 mr-3 h-11 w-11 rounded-full bg-gray-200 dark:bg-gray-600 duration-150"></div>
        }
        <div className="font-medium my-auto">
          <span className={authorData.role ? '' : 'pl-2 font-semibold'}>
            {authorData.name || slug}
          </span>
          {authorData.role && (<div className="text-xs">{authorData.role}</div>)}
        </div>
      </Link>
      { authorData.description &&
        <div className="text-sm py-2 mb-1">
          {authorData.description}
        </div>
      }
      <div className="flex flex-wrap">
        {[1, 2].map(index => {return (authorData['socialLink' + index] &&
          <div className="text-sm text-gray-500 w-1/2 md:w-full mb-4 md:mb-1" key={`social-link-${authorData.slug}-${index}`}>
            <span>
              {authorData['socialPlatform' + index] && authorData['socialHandle' + index] ? `${authorData['socialPlatform' + index]}: ` : 'Social: '}
            </span>
            <a href={authorData['socialLink' + index]} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
              {authorData['socialPlatform' + index] && authorData['socialHandle' + index] ? `@${authorData['socialHandle' + index].replace('@', '')}` : authorData['socialPlatform' + index]}
              {(!authorData['socialPlatform' + index] || !authorData['socialPlatform' + index].length) ? authorData['socialLink' + index].slice(authorData['socialLink' + index].lastIndexOf('://')+3) : '' }
            </a>
          </div>
        )})}
        {authorData.websiteLink && (
          <div className="text-sm w-1/2 md:w-full text-gray-500 mb-4 md:mb-1">
            <span className="pr-1">
              Website:
            </span>
            <a href={authorData.websiteLink} target="_blank" rel="nofollow noopener" className="text-gray-700 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300 underline-animated">
              {authorData.websiteLink && authorData.websiteName ? authorData.websiteName : authorData.websiteLink.slice(authorData.websiteLink.lastIndexOf('://')+3)}
            </a>
          </div>
        )}
      </div>
      

    </div>
  )
}

export default AuthorCard