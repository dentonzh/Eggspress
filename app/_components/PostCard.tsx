import React from 'react'
import Like from './Like'
import Link from 'next/link';
import { PostItem } from '@/types/Blog'
import { createSlug } from '../utils';
// import styles from './PostCard.module.css'

interface PostProps {
  post: PostItem
}

const convertDate = (inputDate: string|null) => {
  if (inputDate === null) {
    return ''
  }
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}

const PostCard = ({ post }: PostProps) => {
  return (
    <div className='flex flex-wrap items-baseline mb-12 text-gray-800 dark:text-gray-100'>
      <Link className="text-2xl font-semibold mb-3" href={`/blog/${post.slug}`}>{post.title}</Link>
      <div className='w-full mb-3 prose dark:prose-invert'>{post.snippet}</div>
      <div className=''>
        <Link href={`/blog/${post.slug}`} className="underline-animated font-medium text-blue-700 hover:text-blue-800 dark:text-blue-300 hover:dark:text-blue-200">
          Read more
        </Link>
        {/* <Like></Like> */}
      </div>
      {/* <div>{createSlug(post.category)}</div> */}
      {/* <div className='items-end ml-auto text-gray-400'>{convertDate(post.publishDate)}</div> */}
    </div>
  )
}

export default PostCard