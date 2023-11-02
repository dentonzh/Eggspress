import matter from 'gray-matter'
import fs from 'fs'

const getPostContent = (slug:string): {content: string} => {
  const dir = './posts/'
  const files = fs.readdirSync(dir)
  const markdownFiles = files.filter((file) => file.startsWith(slug))
  const data = markdownFiles.map((file) => {
    const content = fs.readFileSync(`posts/${file}`, 'utf8')
    return {
      content: content
    }
  })
    
  return data[0]
}

export default getPostContent