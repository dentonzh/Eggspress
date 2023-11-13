import { copyImageToPublic } from '@/app/utils'
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
        console.log(image)
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

            copyImageToPublic(sourceDir, imagePath)

            image.url = imageUrl

          }
        })

      }
    })

    if (tree.children && tree.children[0] && tree.children[0].children && tree.children[0].children[0].type === 'image') {
      const ledeImage = tree.children[0].children[0]
      console.log(ledeImage)
      ledeImage.data.hProperties.className = ['mt-0']
    }
  }
}