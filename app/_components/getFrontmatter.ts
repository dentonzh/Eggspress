import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { PostItem, AuthorItem } from '@/types/Blog'
import { getFilesRecursivelyWithExtensions } from '../utils'

type ItemType<T extends string> = T extends 'posts' ? PostItem : T extends 'authors' ? AuthorItem : PostItem

const extractFrontmatter = async (markdownData: { content: string; slug: string; path: string }[]) => {
  const frontmatterData = await Promise.all(
    markdownData.map(async data => {
      let serializedData: any = await serialize(data.content, { parseFrontmatter: true })
      serializedData.frontmatter.slug = data.slug
      serializedData.frontmatter.path = data.path
      return serializedData.frontmatter
    })
  )

  return frontmatterData
}

const getFrontmatter = async <T extends string>(
  type: T,
  sortBy?: string,
  sortReversed?: boolean,
  showAll?: boolean
): Promise<ItemType<T>[]> => {
  const dir = `./my_${type}/`
  const allowedExtensions = ['.md', '.mdx']
  const files = await getFilesRecursivelyWithExtensions(dir, allowedExtensions)

  const data = files.map(file => {
    const content = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
    return {
      content: content,
      slug: file.slug,
      path: file.path,
    }
  })

  const frontmatterData = await extractFrontmatter(data)
  const filteredFrontmatterData = showAll ? frontmatterData : frontmatterData.filter(fm => !(fm.isVisible === false))
  const sortedData = filteredFrontmatterData.sort((a, b) => {
    let x = (a.date || a.publishDate || 0) < (b.date || b.publishDate || 0) ? 1 : -1
    if (sortBy === 'weight') {
      x = a.weight < b.weight ? -1 : 1
    } else if (sortBy?.startsWith('alpha')) {
      x = (a.title || a.name || 0) < (b.title || b.name || 0) ? -1 : 1
    }
    if (sortReversed) {
      return -x
    }
    return x
  })

  return sortedData
}

export default getFrontmatter
