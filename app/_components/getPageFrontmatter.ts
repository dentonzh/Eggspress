import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { PostItem } from '@/types/Blog'
import { getFilesRecursivelyWithExtensions } from '../utils'


const extractFrontmatter = async (markdownData: {content: string, slug: string}[]) => {
  const frontmatterData = await Promise.all(
    markdownData.map( async ( data ) => {
      let serializedData: any = await serialize(data.content, {parseFrontmatter: true})
      serializedData.frontmatter.slug = data.slug
      return serializedData.frontmatter as PostItem
    })
  )
  
  return frontmatterData
}

const getPageFrontmatter = async (): Promise<PostItem[]> => {
  const dir = './my_pages/'
  const allowedExtensions = ['.md', '.mdx']
  const files = await getFilesRecursivelyWithExtensions(dir, allowedExtensions)
  
  const data = files.map((file) => {
    const content = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
    return {
      content: content, 
      slug: file.slug
    }
  })

  const frontmatterData = await extractFrontmatter(data)
  const sortedData = frontmatterData.sort((a, b) => {
    const x = (a.date || a.publishDate || 0) < (b.date || b.publishDate || 0) ? 1 : -1
    return x
  })
  
  return sortedData
}

export default getPageFrontmatter