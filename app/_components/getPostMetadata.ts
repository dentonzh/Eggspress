import matter from 'gray-matter'
import fs from 'fs'

interface PostMetadata {
  title: string
  publishDate: string
  subtitle: string
  slug: string
}

const getPostMetadata = (): PostMetadata[] => {
  const dir = './posts/'
  const files = fs.readdirSync(dir)
  const allowedExtensions = ['.md', '.mdx']
  const mdxFiles = files.filter((file) => allowedExtensions.includes(file.substring(file.lastIndexOf('.'))))
  const posts = mdxFiles.map((file) => {
    const content = fs.readFileSync(`posts/${file}`, 'utf8')
    const metadata = matter(content).data
    return {
      title: metadata.title,
      publishDate: metadata.publishDate,
      subtitle: metadata.subtitle,
      slug: file.replace('.mdx', '')
    }
  })


  return posts
}

export default getPostMetadata