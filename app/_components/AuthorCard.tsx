import React from 'react'
import getFrontmatter from './getFrontmatter'
import { getImageFilesRecursively } from '../utils'

const AuthorCard = async ({slug}: {slug: string | null}) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => {return frontmatter.slug === slug})[0]
  const imageFiles = await getImageFilesRecursively('./my_authors/')
  console.log(imageFiles)

  return (
    <div>
      {authorData ? authorData.name : ''}
      {authorData ? authorData.description : ''}
    </div>
  )
}

export default AuthorCard