import fs from 'fs'
import { getMarkdownFilesRecursively, getImageFilesRecursively } from '../utils'
import { ImageFile, PostFile } from '@/types/Blog'

const getContent = async (
  type: string,
  slug: string
): Promise<{ markdownData: string; imageFiles: ImageFile[]; filePath: string }> => {
  const dir = `./my_${type}/`
  const markdownFiles: PostFile[] = await getMarkdownFilesRecursively(dir)
  const imageFiles: ImageFile[] = await getImageFilesRecursively(dir)
  const slugsToMarkdownFilesMap: Record<string, PostFile> = markdownFiles.reduce(
    (prev, cur) => ({ ...prev, [cur.slug]: cur }),
    {}
  )
  const file = slugsToMarkdownFilesMap[slug]
  if (file) {
    const markdownData = fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
    const filePath = file.path
    return { markdownData, imageFiles, filePath }
  }

  return {
    markdownData:
      '---\n\ntitle: "Error 404"\nsubheading: Not found\nisVisible: false\n---\n\n\n \nSorry, the requested resource does not exist or has been removed. Please check that your address is correct and try again.\n\n Please use the back button or [return to the home page](/).',
    imageFiles: [],
    filePath: '',
  }
}

export default getContent
