import Image from 'next/image'
import Link from 'next/link'
import getPostData from '../_components/getPostData'
import PostCard from '../_components/PostCard'
import Sidebar from '../_components/Sidebar'
import { serialize } from 'next-mdx-remote/serialize'
import { useState } from 'react'


const aboutMe = {
  biography: "I'm John Doe, a rugged wilderness guide. I navigate the untamed outdoors, and my survival skills make me a true nature's navigator.",
  company: "Wild Trails Expeditions",
  hobbies: "Hiking, camping",
  social_media_handle: "@WildDoeExplorer"
}

export default async function Home() {
  const data = await getSerializedData()
  return (
    <main className="flex flex-wrap">
      <div className="w-full mb-12 pt-32 pb-12 text-gray-800 dark:text-gray-100 bleed-bg bleed-slate-100 dark:bleed-gray-900">
        <h1 className="text-5xl font-bold mb-3">Latest Posts</h1>      
        <div>Welcome to my blog, where I share my thoughts about the world 🌎</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='max-w-prose'>
          {data.map(post => 
              <PostCard key={post.frontmatter.slug} post={post.frontmatter}></PostCard>
          )}
        </div>
        <div>
          <Sidebar>
            <div className='grow text-gray-800 dark:text-gray-100 text-sm leading-relaxed'>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-400">Hello there!</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.biography}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-400">Where I work</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.company}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-400">My hobbies</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.hobbies}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-400">Social Media</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.social_media_handle}
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
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