import { copyImageToPublic, sortFilesByProximity } from '@/app/utils'
import { PostFile } from '@/types/Blog'
import { visit } from 'unist-util-visit'

const fs = require('fs-extra')
const sizeOf = require('image-size')

const publicImgDir = 'images'

interface ImageNode {
  type: string
  title?: string
  url: string
  alt: string
  position: Record<any, any>
  data: Record<any, any>
}

const videoExtensions = ['.webm', '.mp4', '.m4v', '.mov', '.wmv', '.asf', '.avi', '.mpg', '.mpeg']

const processImage = (slug: string, image: ImageNode, imageFiles: PostFile[], filePath?: string) => {
  const fileName = image.url.slice(image.url.lastIndexOf('/') + 1)

  for (let i = 0; i < imageFiles.length; i++) {
    const file = imageFiles[i]
    if (file.name === decodeURI(fileName)) {
      const imagePath = `/${publicImgDir}/${slug}`
      const imageUrl = `${imagePath}/${fileName.replaceAll('%20', '_')}`

      const sourceDir = `${file.path}/${file.name}`

      if (fs.existsSync(sourceDir)) {
        if (!videoExtensions.includes(file.extension)) {
          const dimensions = sizeOf(sourceDir)
          image.data = image.data || {} // Ensure data exists
          image.data.hProperties = { // Assign hProperties
            ...(image.data.hProperties || {}), // Preserve existing hProperties if any
            width: dimensions.width,
            height: dimensions.height,
          }
        }

        copyImageToPublic(sourceDir, imagePath)
        image.url = imageUrl
      }
      break
    }
  }
}

export function eggspressMedia({
  slug,
  imageFiles,
  filePath,
}: {
  slug: string
  imageFiles: PostFile[]
  filePath: string
}) {
  let sortedImageFiles = imageFiles
  if (filePath) {
    sortedImageFiles = sortFilesByProximity(filePath, imageFiles)
  }
  return (tree: any) => {
    visit(tree, 'paragraph', node => {
      const images = node.children.filter((child?: any) => child?.type === 'image')

      if (images) {
        images.forEach((image: ImageNode) => {
          processImage(slug, image, sortedImageFiles)
        })
      }
    })

    if (tree.children && tree.children[0] && tree.children[0]?.type === 'heading') {
      const ledeHeading = tree.children[0]
      ledeHeading.data = ledeHeading.data || {} // Ensure data exists
      ledeHeading.data.hProperties = ledeHeading.data.hProperties || {} // Ensure hProperties exists
      ledeHeading.data.hProperties.style = 'margin-top: 0px;' // Assign style directly
    }

    if (
      tree.children &&
      tree.children[0] &&
      tree.children[0].children &&
      tree.children[0].children[0]?.type === 'image'
    ) {
      const ledeImage = tree.children[0].children[0]
      ledeImage.data = ledeImage.data || {} // Ensure data exists
      ledeImage.data.hProperties = ledeImage.data.hProperties || {} // Ensure hProperties exists
      ledeImage.data.hProperties.className = ['mt-0'] // Assign className (can be array)
      ledeImage.data.hProperties.fetchpriority = 'high' // Assign fetchpriority
    }
  }
}

export function eggspressCode() {
  return (tree: any) => {
    visit(tree, 'code', node => {
      if (!node.lang) {
        node.data = node.data || {} // Ensure data exists
        node.data.hProperties = { // Assign hProperties
          ...(node.data.hProperties || {}), // Preserve existing hProperties if any
          className: ['hljs', ...(node.data.hProperties?.className || [])] // Add hljs class
        }
      }
    })
  }
}

export default eggspressMedia
