import Link from 'next/link'
import React from 'react'
import PostCard from '../../_components/PostCard';
import { PostItem } from '@/types/Blog'


const PostsPage = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts: PostItem[] = await res.json();

  return (
    <>
      <h1 className='text-2xl font-bold'>Posts</h1>
      <ul>
        {posts.map(post => <PostCard post={post}></PostCard>)}
      </ul>
    </>
  )
}

export default PostsPage