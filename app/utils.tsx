import { glob } from 'glob'
import { serialize } from 'next-mdx-remote/serialize'
import { ImageFile, PostFile } from '@/types/Blog';

const fs = require('fs-extra')

export async function getEggspressSettings(kind: string|null): Promise<any> {
  if (!kind) {
    kind = 'blog'
  }
  
  try {
    const file = `./my_settings/${kind}.md`
    const data = fs.readFileSync(file, 'utf-8')
    const serializedData = await serialize(data, {parseFrontmatter: true})
    
    return serializedData.frontmatter
  } catch (e) {
    return e
  }
}

export function createSlug(text: string|null) {
  if (!text) {
    return ''
  }
  return text.toLowerCase()
    .replace(/[_ ]/g, "-")
    .replace(/[^\w-]+/g, "");
}


export async function getMarkdownSlugs(dir: string): Promise<{ slug: string }[]> {
  const files = await getFilesRecursively(dir)
  const allowedExtensions = ['.md', '.mdx']
  const markdownFiles = files.filter(
    (file) => allowedExtensions.includes(file.extension)
  )
  
  const slugs = markdownFiles.map((file) => {
    return {'slug': file.slug }
  })

  return slugs
}


// Implementation of getFilesRecursively using glob
export async function getFilesRecursively(dir: string): Promise<PostFile[]> {
  let arrayOfFilenames: PostFile[] = []
  const files = await glob(`${dir}/**/*`)

  arrayOfFilenames = files.filter(
    file => file.slice(file.lastIndexOf('/') + 1).charAt(0) !== '#'
  ).filter(
    file => file.indexOf('.') >= 0
  ).map(
    (file) => {
      return {
        name: file.slice(file.lastIndexOf('/') + 1),
        path: file.slice(0, file.lastIndexOf('/')),
        extension: file.slice(file.lastIndexOf('.')),
        slug: createSlug(file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.')))
      } 
    }
  )
  return arrayOfFilenames
}


export async function getFilesRecursivelyWithExtensions(dir: string, extensions: string[]): Promise<PostFile[]> {
  const files = await getFilesRecursively(dir)
  const filteredFiles = files.filter((file) => extensions.includes(file.extension))
  return filteredFiles
}


export async function getMarkdownFilesRecursively(dir: string): Promise<PostFile[]> {
  const extensions = ['.md', '.mdx']
  const files = await getFilesRecursivelyWithExtensions(dir, extensions)
  return files
}


export async function getImageFilesRecursively(dir: string, dirToSearchFirst?: string): Promise<ImageFile[]> {
  const extensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif', '.avif', '.bmp', '.tif', '.ico', '.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']
  const files = await getFilesRecursivelyWithExtensions(dir, extensions)
  return files
}

export function sortFilesByProximity(toPath: string, files: PostFile[]): PostFile[] {
  files.sort((a, b) => {
    const aPath = a.path
    const bPath = b.path

    if (aPath === toPath) {return -1}
    if (bPath === toPath) {return 1}
    
    const aLevel = aPath.split('/').length
    const bLevel = bPath.split('/').length
    const baseLevel = toPath.split('/').length

    if (aPath.includes(toPath) && bPath.includes(toPath)) {
      console.log(aLevel, bLevel, a, b)
      if (aLevel < bLevel) {return -1}
      if (aLevel > bLevel) {return 1}
      return 0
    } else {
      if (aPath.includes(toPath)) {return -1}
      if (bPath.includes(toPath)) {return 1}
    }

    return Math.abs(aLevel - baseLevel) - Math.abs(bLevel - baseLevel)
  })

  return files
  
}


export function copyImageToPublic(source: string, toPath: string) {
  const fileName = source.slice(source.lastIndexOf('/') + 1).replaceAll('%20', '_').replaceAll(' ', '_')
  const destinationPath = `public/${toPath}`
  const destinationFile = `${destinationPath}/${fileName}`

  if (!fs.existsSync(destinationFile)) {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, {recursive: true})
    }
    fs.copySync(source, destinationFile)
  }

  return `/${toPath}/${fileName}`
}

// Function below requires Node 20, which AWS Lambda does not support-- see above function for glob implementation
// export async function getFilesRecursively(dir: string): Promise<PostFile[]> {
//   let arrayOfFilenames: PostFile[] = []
//   await fs.readdir(dir, {recursive: true, withFileTypes: true}, (err, files) => {
//     arrayOfFilenames = files.filter((file) => 
//       {return file.isFile()}).map((file) => {
//         return {
//           name: file.name,
//           path: file.path,
//           extension: file.name.slice(file.name.lastIndexOf('.')),
//           slug: createSlug(file.name.slice(file.name.lastIndexOf('/') + 1, file.name.lastIndexOf('.')))
//         }
//       }
//     )
//   })
//   return arrayOfFilenames
// }