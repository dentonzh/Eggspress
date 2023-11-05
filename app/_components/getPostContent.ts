import fs from 'fs'
import { getFilesRecursively } from '../utils'
import { PostFile } from '@/types/Blog'

const getPostContent = async (slug:string): Promise<string> => {
  const dir = './posts/'
  const files = await getFilesRecursively(dir)
  const slugsToFilesMap: Record<string, PostFile> = files.reduce((prev, cur) => (
      {...prev, [cur.slug]: cur}
    ), {})
  const file = slugsToFilesMap[slug]
  return fs.readFileSync(`${file.path}/${file.name}`, 'utf-8')
}

export default getPostContent