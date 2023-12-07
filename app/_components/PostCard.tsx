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
    <div className={`${index === 0 ? (post.image && imagePath ? 'mt-0 mb-20': 'mt-0 mb-8') : post.image && imagePath ? 'my-20' : 'mt-8'} flex flex-wrap items-baseline text-gray-800 dark:text-gray-100`}>
      {post.image && imagePath && 
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Image 
            className="w-full h-64 sm:h-80 md:h-72 object-cover mb-6" 
            width={0} height={0} sizes="100vw" 
            alt={`Image for ${post.title}`} 
            src={`/images/${post.slug}/${post.image}`}
            style={{objectPosition: `${post.imagePositionX || 50}% ${post.imagePositionY || 50}%`}}
            priority={index === 0 ? true : false}
          ></Image>
        </Link>
      }

      <Link className="text-2xl font-semibold mb-3" href={`/blog/${post.slug}`}>
        {post.title || 'Untitled Post'}
      </Link>
      
      {(appearanceSettings.showPostCardCategory && post.category) || (appearanceSettings.showPostCardDate && (post.date || post.publishDate)) &&
        <div className="flex flex-wrap w-full mb-4">
          {appearanceSettings.showPostCardCategory && post.category &&
            <div className="flex flex-wrap">
              <Link className="text-sm font-medium underline-animated" href={`/${createSlug(post.category)}`}>
                {post.category}
              </Link>
              {
                appearanceSettings.showPostCardDate &&
                <div className="px-1 text-sm font-medium text-gray-300 dark:text-gray-700">|</div>
              }
            </div>
          }
          {appearanceSettings.showPostCardDate && (post.date || post.publishDate) &&
            <div className="text-sm font-medium text-gray-700">{convertDate(post.date || post.publishDate)}</div>
          }
        </div>
      }
      {appearanceSettings.showPostCardSnippet &&
        <div className='w-full mb-3 prose dark:prose-invert line-clamp-4'>{post.snippet || post.description}</div>
      }
      {appearanceSettings.showPostCardReadMoreButton && post.slug &&
        <ReadMore slug={post.slug}></ReadMore>
      }
    </div>
  )
}

export default PostCard