import { glob } from 'glob'
import { serialize } from 'next-mdx-remote/serialize'
import { PostFile } from '@/types/Blog';

const fs = require('fs-extra')

export async function getEggspressSettings(kind: string|null): Promise<any> {
  if (!kind) {
    kind = 'blog'
  }

  const file = `./my_settings/${kind}.md`
  const data = fs.readFileSync(file, 'utf-8')
  const serializedData = await serialize(data, {parseFrontmatter: true})
  
  return serializedData.frontmatter
}

export function createSlug(categoryName: string|null) {
  if (!categoryName) {
    return ''
  }
  return categoryName.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}


export async function getMarkdownSlugs(dir: string): Promise<{ slug: string }[]> {
  const files = await getFilesRecursively(dir)
  const allowedExtensions = ['.md', '.mdx']
  const markdownFiles = files.filter((file) => allowedExtensions.includes(file.extension))
  
  const slugs = markdownFiles.map((file) => {
    return {'slug': file.slug }
  })

  return slugs
}


// Implementation of getFilesRecursively using glob
export async function getFilesRecursively(dir: string): Promise<PostFile[]> {
  let arrayOfFilenames: PostFile[] = []
  const files = await glob(`${dir}/**/*`)
    arrayOfFilenames = files.filter((file) => {return file.indexOf('.') >= 0}).map((file) => {
      return {
        name: file.slice(file.lastIndexOf('/') + 1),
        path: file.slice(0, file.lastIndexOf('/')),
        extension: file.slice(file.lastIndexOf('.')),
        slug: createSlug(file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.')))
      } 
    })
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


export async function getImageFilesRecursively(dir: string): Promise<PostFile[]> {
  const extensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif', '.avif', '.apng', '.bmp', '.tif', '.ico']
  const files = await getFilesRecursivelyWithExtensions(dir, extensions)
  return files
}


export function copyImageToPublic(source: string, toPath: string): string {
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