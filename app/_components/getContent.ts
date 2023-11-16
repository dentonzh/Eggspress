import fs from 'fs'
import { getMarkdownFilesRecursively, getImageFilesRecursively } from '../utils'
import { ImageFile, PostFile } from '@/types/Blog'


const getContent = async (type: string, slug:string ): Promise<{markdownData: string, imageFiles: ImageFile[], filePath: string}> => {
  const dir = `./my_${type}/`
  const markdownFiles: PostFile[] = await getMarkdownFilesRecursively(dir)
  const imageFiles: ImageFile[] = await getImageFilesRecursively(dir)
  const slugsToFilesMap: Record<string, PostFile> = markdownFiles.reduce((prev, cur) => (
      {...prev, [cur.slug]: cur}
    ), {})
  const file = slugsToFilesMap[slug]
  const markdownData = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
  const filePath = file.path
  return { markdownData, imageFiles, filePath }
}

export default getContent