const fs = require('fs-extra')
import { PostFile } from '@/types/Blog'
import { visit } from 'unist-util-visit'

const publicImgDir = 'images'


export default function transformImgSrc({
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
          if (file.name === fileName) {
            const imagePath = `/${publicImgDir}/${slug}`
            const imageUrl = `${imagePath}/${fileName}`
            
            const sourceDir = `${file.path}/${file.name}`
            const destinationDir = `public${imageUrl}`
            
            const destinationPath = `public${imagePath}`

            if (fs.existsSync(destinationDir)) {
              image.url = imageUrl
              return
            }

            if (!fs.existsSync(destinationPath)) {
              fs.mkdirSync(destinationPath, {recursive: true})
            }
            
            fs.copySync(sourceDir, destinationDir)
            image.url = imageUrl
          }
        })

      }
    })
  }
}