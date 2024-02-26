import { glob } from 'glob'
import { serialize } from 'next-mdx-remote/serialize'
import { ImageFile, PostFile } from '@/types/Blog'
import { getPlaiceholder } from 'plaiceholder'

const fs = require('fs-extra')

// Utility functions for User Components

export async function getUserDataRecursively(filename: string, subfolder?: string) {
  const files = await getFilesRecursively(`my_data${subfolder ? `/${subfolder}` : ''}`)
  const filesMatched = files.filter(file => file.name === filename)

  if (filesMatched.length) {
    const file = filesMatched[0]
    return `${file.path}/${file.name}`
  }

  return null
}

// Utility functions for Eggspress app

export async function getEggspressSettings(kind: string | null): Promise<any> {
  if (!kind) {
    kind = 'blog'
  }

  try {
    const file = `./my_settings/${kind}.md`
    const data = fs.readFileSync(file, 'utf-8')
    const serializedData = await serialize(data, { parseFrontmatter: true })

    return serializedData.frontmatter
  } catch (e) {
    return e
  }
}

export function createSlug(text?: string) {
  if (!text) {
    return ''
  }
  return text
    .toLowerCase()
    .replace(/[_ ]/g, '-')
    .replace(/[^\w-]+/g, '')
}

export async function getMarkdownSlugs(dir: string): Promise<{ slug: string }[]> {
  const files = await getFilesRecursively(dir)
  const allowedExtensions = ['.md', '.mdx']
  const markdownFiles = files.filter(file => allowedExtensions.includes(file.extension))

  const slugs = markdownFiles.map(file => {
    return { slug: file.slug }
  })

  return slugs
}

export async function getFolders(dir: string): Promise<string[]> {
  const fileList = await fs.readdirSync(dir)
  return fileList
}

// Implementation of getFilesRecursively using glob
export async function getFilesRecursively(dir: string): Promise<PostFile[]> {
  let arrayOfFilenames: PostFile[] = []
  const files = await glob(`${dir}/**/*`)

  arrayOfFilenames = files
    .filter(
      file => file.slice(file.lastIndexOf('/') + 1).charAt(0) !== '#' // Ignore files whose filenames start with "#"
    )
    .filter(file => file.indexOf('.') >= 0)
    .map(file => {
      return {
        name: file.slice(file.lastIndexOf('/') + 1),
        path: file.slice(0, file.lastIndexOf('/')),
        extension: file.slice(file.lastIndexOf('.')),
        slug: createSlug(file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))),
      }
    })
  return arrayOfFilenames
}

export async function getFilesRecursivelyWithExtensions(dir: string, extensions: string[]): Promise<PostFile[]> {
  const files = await getFilesRecursively(dir)
  const filteredFiles = files.filter(file => extensions.includes(file.extension))
  return filteredFiles
}

export async function getMarkdownFilesRecursively(dir: string): Promise<PostFile[]> {
  const extensions = ['.md', '.mdx']
  const files = await getFilesRecursivelyWithExtensions(dir, extensions)
  return files
}

export async function getImageFilesRecursively(dir: string, dirToSearchFirst?: string): Promise<ImageFile[]> {
  const extensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.svg',
    '.webp',
    '.gif',
    '.avif',
    '.bmp',
    '.tif',
    '.ico',
    '.webm',
    '.mp4',
    '.m4v',
    '.mov',
    '.wmv',
    '.asf',
    '.avi',
    '.mpg',
    '.mpeg',
  ]
  const files = await getFilesRecursivelyWithExtensions(dir, extensions)
  return files
}

export async function getImagePlaceholderAsBase64(imagePath: string): Promise<string> {
  try {
    const file = await fs.readFileSync(imagePath)
    const options = { size: 4, lightness: 24 }
    const { base64 } = await getPlaiceholder(file, options)
    return base64
  } catch {
    return ''
  }
}

export function sortFilesByProximity(toPath: string, files: PostFile[]): PostFile[] {
  files.sort((a, b) => {
    const aPath = a.path
    const bPath = b.path

    if (aPath === toPath) {
      return -1
    }
    if (bPath === toPath) {
      return 1
    }

    const aLevel = aPath.split('/').length
    const bLevel = bPath.split('/').length
    const baseLevel = toPath.split('/').length

    if (aPath.includes(toPath) && bPath.includes(toPath)) {
      if (aLevel < bLevel) {
        return -1
      }
      if (aLevel > bLevel) {
        return 1
      }
      return 0
    } else {
      if (aPath.includes(toPath)) {
        return -1
      }
      if (bPath.includes(toPath)) {
        return 1
      }
    }

    return Math.abs(aLevel - baseLevel) - Math.abs(bLevel - baseLevel)
  })

  return files
}

export function copyImageToPublic(source: string, toPath: string) {
  const fileName = source
    .slice(source.lastIndexOf('/') + 1)
    .replaceAll('%20', '_')
    .replaceAll(' ', '_')
  const destinationPath = `public/${toPath}`
  const destinationFile = `${destinationPath}/${fileName}`

  if (!fs.existsSync(source)) {
    return
  }

  if (!fs.existsSync(destinationFile)) {
    if (!fs.existsSync(destinationPath)) {
      fs.mkdirSync(destinationPath, { recursive: true })
    }
    fs.copySync(source, destinationFile)
  }

  return `/${toPath}/${fileName}`
}

export async function getColors(prefix: string, colorKey: string, fallbackDark = '', fallbackLight = '') {
  // Looks up color keys in appearance.md and, given a prefix or a fallback, returns
  // the correct color classes. This automatically checks for Light- and Dark- suffixed keys

  const appearanceSettings = await getEggspressSettings('appearance')
  const colorScheme = appearanceSettings?.colorScheme

  let colorSettings = appearanceSettings

  if (colorScheme) {
    colorSettings = await getEggspressSettings(`colors/${colorScheme}`)
  }

  const key = `color${colorKey}`

  let classNames = []

  if (colorSettings[`${key}Dark`]) {
    const className = `dark:${prefix}-${colorSettings[`${key}Dark`]}`
    classNames.push(className)
  } else if (fallbackDark) {
    const className = `dark:${prefix}-${fallbackDark}`
    classNames.push(className)
  }

  if (colorSettings[`${key}Light`]) {
    const className = `${prefix}-${colorSettings[`${key}Light`]}`
    classNames.push(className)
  } else if (fallbackLight) {
    const className = `${prefix}-${fallbackLight}`
    classNames.push(className)
  }

  return classNames.join(' ')
}

export async function getString(stringName: string, fallback?: string) {
  const strings = await getEggspressSettings('strings')
  if (strings[stringName]) {
    return strings[stringName]
  } else {
    return fallback || ''
  }
}

export async function getFontSetting(target: string) {
  const appearanceSettings = await getEggspressSettings('appearance')
  const fontSetting = appearanceSettings?.fontSetting
}

export async function buildLink(url: string) {
  const linkSettings = await getEggspressSettings('links')
  const re = /:\/\/([^\/]*)(.*)/
  const match = url.match(re)

  if (match && match[1]) {
    const baseUrl = match[1]
    for (let i = 1; i <= 20; i++) {
      if (!linkSettings[`modifyLinkBaseUrl${i}`]) {
        continue
      }

      let isMatch = baseUrl.toLowerCase().includes(linkSettings[`modifyLinkBaseUrl${i}`].toLowerCase())

      if (linkSettings[`modifyLinkStrictMatch${i}`]) {
        isMatch = linkSettings[`modifyLinkBaseUrl${i}`] === baseUrl
      }

      if (isMatch) {
        let newUrl = ''
        if (linkSettings[`modifyLinkSetPrefix${i}`]) {
          if (linkSettings[`modifyLinkSetPrefix${i}`] && linkSettings[`modifyLinkSetPrefix${i}`].includes('://')) {
            newUrl += linkSettings[`modifyLinkSetPrefix${i}`]
          }
          newUrl += `https://${linkSettings[`modifyLinkSetPrefix${i}`]}`
        } else {
          newUrl += 'https://'
        }

        if (linkSettings[`modifyLinkSetNewBaseUrl${i}`]) {
          newUrl += linkSettings[`modifyLinkSetNewBaseUrl${i}`]
        } else {
          newUrl += baseUrl
        }

        newUrl += match[2] || ''

        if (linkSettings[`modifyLinkSetSuffix${i}`]) {
          if (match[2] && match[2].includes('?')) {
            newUrl += linkSettings[`modifyLinkSetSuffix${i}`].replaceAll('?', '&')
          } else {
            newUrl += linkSettings[`modifyLinkSetSuffix${i}`]
          }
        }
        return newUrl
      }
    }
  }

  return url
}

export function isUrlAbsolute(url: string) {
  return url.indexOf('//') === 0
    ? true
    : url.indexOf('://') === -1
      ? false
      : url.indexOf('.') === -1
        ? false
        : url.indexOf('/') === -1
          ? false
          : url.indexOf(':') > url.indexOf('/')
            ? false
            : url.indexOf('://') < url.indexOf('.')
              ? true
              : false
}

export function setAnchorTargetProperty(url: string) {
  return isUrlAbsolute(url) ? '_blank' : '_self'
}
