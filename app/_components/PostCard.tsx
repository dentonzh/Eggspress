import React from 'react'
import ReadMore from './ReadMore'
import Link from 'next/link';
import { PostItem } from '@/types/Blog'
import { copyImageToPublic, createSlug, getEggspressSettings, getImageFilesRecursively, sortFilesByProximity } from '../utils';
import Image from 'next/image';
// import styles from './PostCard.module.css'

interface PostProps {
  post: PostItem,
  index?: number
}

const convertDate = (inputDate: string|null) => {
  if (inputDate === null) {
    return ''
  }
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}


const PostCard = async ({ post, index }: PostProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')
  let imagePath = null

  if (post.image) {
    const imageFiles = await getImageFilesRecursively(post.path)
    const sortedImageFiles = sortFilesByProximity(post.path, imageFiles)
    const imageFile = imageFiles.filter(file => file.name === post.image)[0]

    if (imageFile) {
      const source = `${imageFile.path}/${imageFile.name}`
      imagePath = copyImageToPublic(source, `images/${post.slug}`)
    }
  }

  return (
    <div className='flex flex-wrap items-baseline mb-16 text-gray-800 dark:text-gray-100'>
      {post.image && imagePath && 
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Image 
            className="w-full h-64 sm:h-80 md:h-72 object-cover mb-3" 
            width={0} height={0} sizes="100vw" 
            alt={`Image for ${post.title}`} 
            src={`/images/${post.slug}/${post.image}`}
            style={{objectPosition: `${post.imagePositionX || 50}% ${post.imagePositionY || 50}%`}}
            priority={index === 0 ? true : false}
          ></Image>
        </Link>
      }

      <div className="flex flex-wrap w-full mb-2">
        {appearanceSettings.showPostCardDate && (post.publishDate || post.date) &&
          <div className="text-sm text-gray-700">{convertDate(post.publishDate || post.date)}</div>
        }
        {appearanceSettings.showPostCardCategory && post.category &&
          <div className="flex flex-wrap">
            {
              appearanceSettings.showPostCardDate &&
              <div className="px-1 text-sm text-gray-300 dark:text-gray-700">|</div>
            }
            <Link className="text-sm underline-animated" href={`/${createSlug(post.category)}`}>
              {post.category}
            </Link>
          </div>
        }
      </div>
      
      <Link className="text-2xl font-semibold mb-3" href={`/blog/${post.slug}`}>{post.title || 'Untitled Post'}</Link>
      {appearanceSettings.showPostCardSnippet &&
        <div className='w-full mb-3 prose dark:prose-invert'>{post.snippet}</div>
      }
      {appearanceSettings.showPostCardReadMoreButton && post.slug &&
        <ReadMore slug={post.slug}></ReadMore>
      }
    </div>
  )
}

export default PostCard