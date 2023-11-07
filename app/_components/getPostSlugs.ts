import { getFilesRecursively } from '../utils'

const getPostSlugs = async (): Promise<{slug: string}[]> => {
  const dir = './posts/'
  const files = await getFilesRecursively(dir)
  const allowedExtensions = ['.md', '.mdx']
  const markdownFiles = files.filter((file) => allowedExtensions.includes(file.extension))
  
  const slugs = markdownFiles.map((file) => {
    return {'slug': file.slug }
  })

  return slugs
}

export default getPostSlugs