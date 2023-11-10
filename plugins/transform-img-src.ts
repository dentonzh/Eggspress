import { PostFile } from '@/types/Blog'
import { visit } from 'unist-util-visit'

const fs = require('fs-extra')
const sizeOf = require('image-size')

const publicImgDir = 'images'


export default function transformImgAttrs({
    slug,
    imageFiles 
  }: {
    slug: string,
    imageFiles: PostFile[]
  }) {
  return (tree: any) => {
    visit(tree, 'paragraph', node => {
      const image = node.children.find((child: any) => child.type === 'image');
      if (image) {
        const fileName = image.url.slice(image.url.lastIndexOf('/') + 1)
        imageFiles.forEach((file) => {
          if (file.name === decodeURI(fileName)) {
            const imagePath = `/${publicImgDir}/${slug}`
            const imageUrl = `${imagePath}/${fileName.replaceAll('%20', '_')}`
            
            const sourceDir = `${file.path}/${file.name}`
            const destinationDir = `public${imagePath}/${fileName.replaceAll('%20', '_')}`
            const destinationPath = `public${imagePath}`

            const dimensions = sizeOf(sourceDir)
            
            image.data = {
              hProperties: {
                width: dimensions.width,
                height: dimensions.height
              }
            }

            if (fs.existsSync(destinationDir)) {
              image.url = imageUrl
            } else {
              if (!fs.existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath, {recursive: true})
              }
              
              fs.copySync(sourceDir, destinationDir)
              image.url = imageUrl
            }

          }
        })

      }
    })
  }
}