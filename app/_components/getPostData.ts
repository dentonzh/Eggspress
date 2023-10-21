import fs from 'fs'

interface PostMetadata {
  title: string
  publishDate: string
  subtitle: string
  slug: string
}

const getPostData = (): {content: string, slug: string}[] => {
  const dir = './posts/'
  const files = fs.readdirSync(dir)
  const allowedExtensions = ['.md', '.mdx']
  const markdownFiles = files.filter((file) => allowedExtensions.includes(file.substring(file.lastIndexOf('.'))))
  const data = markdownFiles.map((file) => {
    const content = fs.readFileSync(`posts/${file}`, 'utf8')
    return {
      content: content, 
      slug: file.slice(file.lastIndexOf('/') + 1, file.lastIndexOf('.'))
    }
  })
    
  return data
}

export default getPostData