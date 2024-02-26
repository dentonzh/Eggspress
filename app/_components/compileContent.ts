import { compileMDX } from 'next-mdx-remote/rsc'
import getContent from '../_components/getContent'
import EggspressImage from '../_components/EggspressImage'
import EggspressLink from '../_components/EggspressLink'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { eggspressMedia, eggspressCode } from '@/plugins/eggspress-markdown-processor'
import { ImageFile, OGImage } from '@/types/Blog'
import EggspressTable from './EggspressTable'
import { all } from 'lowlight'
import * as UserComponents from './UserComponents'

const fs = require('fs-extra')
const sizeOf = require('image-size')

const videoExtensions = ['.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']

type compiledResponse = {
  content: React.ReactNode
  frontmatter: Record<any, any>
  contentLength: number
  images: OGImage[]
}

const compileContent = async (type: string, slug: string): Promise<compiledResponse> => {
  const { markdownData, imageFiles, filePath } = await getContent(type, slug)

  // let scopedFrontmatter = {}

  // if ( UserComponents ) {
  //   const scopedSource = await compileMDX({source: markdownData, options: {parseFrontmatter: true}})
  //   scopedFrontmatter = scopedSource.frontmatter
  // }

  const source = await compileMDX({
    source: markdownData,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [eggspressMedia, { slug, imageFiles, filePath }], eggspressCode],
        // @ts-ignore
        rehypePlugins: [rehypeSlug, [rehypeHighlight, { languages: all }]],
      },
    },
    components: {
      img: EggspressImage as any,
      a: EggspressLink as any,
      table: EggspressTable as any,
      ...(typeof UserComponents !== 'undefined' ? UserComponents : {}),
    },
  })

  source.frontmatter.path = filePath

  const images = imageFiles
    .map((image: ImageFile) => {
      const imageFile = `/images/${slug}/${image.name}`
      if (fs.existsSync(`public/${imageFile}`) && !videoExtensions.includes(image.extension)) {
        const dimensions = sizeOf(`${image.path}/${image.name}`)
        return {
          url: imageFile,
          width: dimensions.width,
          height: dimensions.height,
        }
      } else {
        return {
          url: '',
          width: 0,
          height: 0,
        }
      }
    })
    .filter((image: OGImage) => image.url.length)

  const contentBody = markdownData.slice(markdownData.lastIndexOf('---') + 3).trim()
  const contentLength = contentBody.length

  return { ...source, contentLength, images }
}

export default compileContent
