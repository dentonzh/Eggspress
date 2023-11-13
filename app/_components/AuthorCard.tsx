import React from 'react'
import getFrontmatter from './getFrontmatter'
import { copyImageToPublic, getImageFilesRecursively } from '../utils'
import Image from 'next/image'

const getProfileImage =  async (imageFileName: string) => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFiles = imageFiles.filter(file => file.name === imageFileName)

  if (profileImageFiles.length) {
    const profileImageFile = profileImageFiles[0]
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageUrl = copyImageToPublic(source, 'profile_images')
    return imageUrl
  }

  return null
}


const AuthorCard = async ({slug}: {slug: string | null}) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => {return frontmatter.slug === slug})[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''

  return (
    <div>
      <div className="h-12 w-12 border-2 rounded-full object-cover overflow-hidden">
        <Image src={imageUrl} width="48" height="48" alt={`Profile image for ${authorData.name}`}></Image>
      </div>
      {authorData ? authorData.name : ''}
      {authorData ? authorData.description : ''}
    </div>
  )
}

export default AuthorCard