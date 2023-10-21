import Image from 'next/image'
import Link from 'next/link'
import getPostData from '../_components/getPostData'
import PostCard from '../_components/PostCard'
import { serialize } from 'next-mdx-remote/serialize'


export default async function Home() {
  const data = await getSerializedData()
  return (
    <main className='flex'>
      <div className='max-w-prose'>
        {data.map(post => <PostCard key={post.frontmatter.slug} post={post.frontmatter}></PostCard>)}
      </div>
      <div className='grow bg-gray-200'>
        Some stuff goes here (links, projects, etc)
      </div>
    </main>
  )
}

async function getSerializedData() {
  const markdownFiles = getPostData()
  const serializedData = Promise.all(
    markdownFiles.map( async (file) => {
      let data: any = await serialize(file.content, {parseFrontmatter: true})
      data.frontmatter.slug = file.slug
      return data
    })
  )
  return serializedData

}