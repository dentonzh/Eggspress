import { compileMDX } from 'next-mdx-remote/rsc'
import getContent from '../_components/getContent'
import EggspressImage from '../_components/EggspressImage'
import EggspressLink from '../_components/EggspressLink'
import rehypeSlug from 'rehype-slug'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import eggspressMedia from '@/plugins/eggspress-img-processor'
import { ImageFile, OGImage } from '@/types/Blog'
import EggspressTable from './EggspressTable'
import { all } from 'lowlight'

const fs = require('fs-extra')
const sizeOf = require('image-size')

const videoExtensions = ['.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']

const compileContent = async (type: string, slug:string,): Promise<{content: React.ReactNode, frontmatter: Record<any, any>, contentLength: number, images: OGImage[]}> => {
  const { markdownData, imageFiles, filePath } = await getContent(type, slug)
  
  const source = await compileMDX({
    source: markdownData,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [eggspressMedia, { slug, imageFiles, filePath }]],
        // @ts-ignore
        rehypePlugins: [rehypeSlug, [rehypeHighlight, {languages: all}]]
      }
    },
    components: {
      img: EggspressImage as any,
      a: EggspressLink as any,
      table: EggspressTable as any
    }
  })

  source.frontmatter.path = filePath

  const images = imageFiles.map((image: ImageFile) => {
    const imageFile = `/images/${slug}/${image.name}`
    if (fs.existsSync(`public/${imageFile}`) && !videoExtensions.includes(image.extension)){
      const dimensions = sizeOf(`${image.path}/${image.name}`)
      return {
        url: imageFile,
        width: dimensions.width,
        height: dimensions.height
      }
    } else {
      return {
        url: '',
        width: 0,
        height: 0
      }
    }
  }).filter((image: OGImage) => image.url.length)

  const contentBody = markdownData.slice(markdownData.lastIndexOf('---') + 3).trim()
  const contentLength = contentBody.length

  return {...source, contentLength, images}
}

export default compileContent