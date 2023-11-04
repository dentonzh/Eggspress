import React from 'react'
import getPostFrontmatter from '../_components/getPostFrontmatter'
import { createSlug } from '../utils'
import PostCard from '../_components/PostCard'

export async function generateStaticParams() {
  const postMetadata = await getPostFrontmatter()
  const categorySlugs = new Set(postMetadata.filter(post => 
      {if (!post.category) {return false} return true}
    ).map((post) => 
      createSlug(post.category)
    ))
  return categorySlugs
}

const page = async ({ params }: { params: { category: string }}) => {
  const { category } = params
  const postMetadata = await getPostFrontmatter()
  const filteredPosts = postMetadata.filter(post => {if ( createSlug(post.category) === category) { return true } return false })
  const numbersAsWords = {0: 'No', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine'}

  return (
    <main className="flex flex-wrap">
      <div className="w-full mb-12 pt-32 pb-12 text-gray-800 dark:text-gray-100 bleed-bg bleed-slate-100 dark:bleed-gray-900">
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{ filteredPosts ? filteredPosts[0].category : decodeURI(category) }</h1>
        <div>{filteredPosts.length < 10 ? numbersAsWords[filteredPosts.length] : filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='max-w-prose'>
          {filteredPosts.map(post => 
            <PostCard key={post.slug} post={post}></PostCard>
          )}
        </div>
      </div>
    </main>
  )
}

export default page