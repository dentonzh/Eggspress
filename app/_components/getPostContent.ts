import fs from 'fs'
import { getMarkdownFilesRecursively, getImageFilesRecursively } from '../utils'
import { PostFile } from '@/types/Blog'


const getPostContent = async (slug:string): Promise<{markdownData: string, imageFiles: PostFile[]}> => {
  const dir = './posts/'
  const markdownFiles = await getMarkdownFilesRecursively(dir)
  const imageFiles = await getImageFilesRecursively(dir)
  const slugsToFilesMap: Record<string, PostFile> = markdownFiles.reduce((prev, cur) => (
      {...prev, [cur.slug]: cur}
    ), {})
  const file = slugsToFilesMap[slug]
  const markdownData = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
  return { markdownData, imageFiles }
}

export default getPostContent