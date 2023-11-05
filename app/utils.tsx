import fs from 'fs'
import { PostFile } from '@/types/Blog';

export function createSlug(categoryName: string|null) {
  if (!categoryName) {
    return ''
  }
  return categoryName.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export async function getFilesRecursively(dir: string): Promise<PostFile[]> {
  let arrayOfFilenames: PostFile[] = []
  await fs.readdir(dir, {recursive: true, withFileTypes: true}, (err, files) => {
    arrayOfFilenames = files.filter((file) => 
      {return file.isFile()}).map((file) => {
        return {
          name: file.name,
          path: file.path,
          extension: file.name.slice(file.name.lastIndexOf('.')),
          slug: createSlug(file.name.slice(file.name.lastIndexOf('/') + 1, file.name.lastIndexOf('.')))
        }
      }
    )
  })
  return arrayOfFilenames
}