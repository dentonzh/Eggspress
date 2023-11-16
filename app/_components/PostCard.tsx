import React from 'react'
import Like from './Like'
import Link from 'next/link';
import { PostItem } from '@/types/Blog'
import { copyImageToPublic, createSlug, getImageFilesRecursively } from '../utils';
import Image from 'next/image';
// import styles from './PostCard.module.css'

interface PostProps {
  post: PostItem
}

const convertDate = (inputDate: string|null) => {
  if (inputDate === null) {
    return ''
  }
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-CA', { year: 'numeric', month: 'numeric', day: 'numeric' });
  return formattedDate
}

const PostCard = async ({ post }: PostProps) => {
  if (post.image) {
    const imageFiles = await getImageFilesRecursively(post.path)
    const imageFile = imageFiles.filter(image => image.name === post.image)
    if (imageFile) {
      copyImageToPublic(`${imageFile[0].path}/${imageFile[0].name}`, `images/${post.slug}`)
    }
  }

  return (
    <div className='flex flex-wrap items-baseline mb-12 text-gray-800 dark:text-gray-100'>
      {/* <div className="flex flex-wrap w-full">
        <Link href={`/${createSlug(post.category)}`} className="text-sm">
          {post.category}
        </Link>
        <div className="px-1 text-sm text-gray-300 dark:text-gray-700">|</div>
        <div className="text-sm text-gray-700">{convertDate(post.publishDate)}</div>
      </div> */}
        {post.image && 
          <Link href={`/blog/${post.slug}`} className="w-full">
            <Image className="w-full h-48 md:h-64 object-cover mb-3" width={0} height={0} sizes="100vw" alt={`Image for ${post.title}`} src={`/images/${post.slug}/${post.image}`}></Image>
          </Link>
        }
      
      <Link className="text-2xl font-semibold mb-3" href={`/blog/${post.slug}`}>{post.title}</Link>
      <div className='w-full mb-3 prose dark:prose-invert'>{post.snippet}</div>
      <div className=''>
        <Link href={`/blog/${post.slug}`} className="underline-animated font-medium text-gray-800 hover:text-blue-800 dark:text-white hover:dark:text-blue-200">
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