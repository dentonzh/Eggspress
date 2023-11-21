import { compileMDX } from 'next-mdx-remote/rsc'
import getContent from '../_components/getContent'
import NextImage from '../_components/NextImage'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import transformImgAttrs from '@/plugins/transform-img-src'
import { ImageFile, OGImage } from '@/types/Blog'

const fs = require('fs-extra')
const sizeOf = require('image-size')


const compileContent = async (type: string, slug:string,): Promise<{content: React.ReactNode, frontmatter: Record<any, any>, contentLength: number, images: OGImage[]}> => {
  const { markdownData, imageFiles, filePath } = await getContent(type, slug)
  
  const source = await compileMDX({
    source: markdownData,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [transformImgAttrs, { slug, imageFiles }]],
        rehypePlugins: [rehypeSlug]
      }
    },
    components: {
      img: NextImage as any
    }
  })

  const images = imageFiles.map((image: ImageFile) => {
    const imageFile = `/images/${slug}/${image.name}`
    if (fs.existsSync(`public/${imageFile}`)) {
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