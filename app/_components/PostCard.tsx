import React from 'react'
import ReadMore from './ReadMore'
import Link from 'next/link';
import { PostItem } from '@/types/Blog'
import { copyImageToPublic, createSlug, getEggspressSettings, getImageFilesRecursively, sortFilesByProximity } from '../utils';
import Image from 'next/image';
import getFrontmatter from './getFrontmatter';
// import styles from './PostCard.module.css'

interface PostProps {
  post: PostItem,
  index?: number,
  priority?: boolean
}

const convertDate = (inputDate: string|null) => {
  if (inputDate === null) {
    return ''
  }
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}


// if priority is true and this is the first PostCard to load (index is 0), then add fetchpriority="high" to image 
const PostCard = async ({ post, index, priority=true }: PostProps) => { 
  const appearanceSettings = await getEggspressSettings('appearance')
  let imagePath = null

  const authors = post && post.author ? post.author.split(',').map((author: string) => author.trim().replaceAll('_', '-').replaceAll(' ', '-')) : []
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authors.map(author => {return authorFrontmatter.filter(fm => fm.slug === author)[0]})

  if (post.image) {
    const imageFiles = await getImageFilesRecursively(post.path)
    const imageFile = imageFiles.filter(file => file.name === post.image)[0]

    if (imageFile) {
      const source = `${imageFile.path}/${imageFile.name}`
      imagePath = copyImageToPublic(source, `images/${post.slug}`)
    }
  }

  return (
    <div className={`${index === 0 ? (post.image && imagePath ? 'mt-0 mb-12': 'mt-0 mb-8') : post.image && imagePath ? 'my-12' : 'mt-8'} flex flex-wrap items-baseline ${appearanceSettings.colorPostCardTextDark ? `dark:text-${appearanceSettings.colorPostCardTextDark}` : 'dark:text-gray-100' } ${appearanceSettings.colorPostCardTextLight ? `text-${appearanceSettings.colorPostCardTextLight}` : 'text-gray-800' }`}>
      {post.image && imagePath && 
        <Link href={`/blog/${post.slug}`} className="w-full">
          <Image
            className="w-full h-64 sm:h-80 md:h-72 object-cover mb-6" 
            width={0} 
            height={0} 
            sizes="(max-width: 1024px) 90vw, 60vw"
            alt={`Image for ${post.title}`} 
            src={`/images/${post.slug}/${post.image}`}
            style={{objectPosition: `${post.imagePositionX || 50}% ${post.imagePositionY || 50}%`}}
            priority={index === 0 && priority ? true : false}
          ></Image>
        </Link>
      }

      <Link className={`text-2xl font-semibold ${appearanceSettings.colorPostCardHeadingDark ? `dark:text-${appearanceSettings.colorPostCardHeadingDark}` : '' } ${appearanceSettings.colorPostCardHeadingLight ? `text-${appearanceSettings.colorPostCardHeadingLight}` : '' } ${(appearanceSettings.showPostCardCategory && post.category) || (appearanceSettings.showPostCardDate && (post.date || post.publishDate) || (appearanceSettings.showPostCardAuthor && (post.author))) ? 'mb-4' : 'mb-3'}`} href={`/blog/${post.slug}`}>
        {post.title || 'Untitled Post'}
      </Link>
      
      <div className={`flex flex-wrap w-full ${(appearanceSettings.showPostCardCategory && post.category) || (appearanceSettings.showPostCardDate && (post.date || post.publishDate) || (appearanceSettings.showPostCardAuthor && (post.author))) ? 'mb-4' : ''}`}>
        {appearanceSettings.showPostCardAuthor && authorData &&
          <div className="flex flex-wrap">
            {authorData && authorData.map((author, ix) => {
              return (
                <span key={`post-card-${index}-${author.slug}-${ix}`} className="text-sm font-medium">
                  {ix ? ', ' : ''}
                  <Link className="underline-animated" href={`/author/${author.slug}`}>
                    {author.name}
                  </Link>
                </span>
              )
            })}
            {
              (appearanceSettings.showPostCardCategory || appearanceSettings.showPostCardDate) &&
              <div className="px-1 text-sm font-medium text-gray-300 dark:text-gray-700">|</div>
            }
          </div>
        }
        {appearanceSettings.showPostCardCategory && post.category &&
          <div className="flex flex-wrap">
            <Link className="text-sm font-medium underline-animated" href={`/${createSlug(post.category)}`}>
              {post.category}
            </Link>
            {
              appearanceSettings.showPostCardDate && (post.date || post.publishDate) &&
              <div className={`px-1 text-sm font-medium text-gray-300 dark:text-gray-700 ${(post.date || post.publishDate) && appearanceSettings.showPostCardCategory && post.category && appearanceSettings.showPostCardAuthor && authorData ? 'hidden sm:inline-block' : ''}`}>|</div>
            }
          </div>
        }
        {appearanceSettings.showPostCardDate && (post.date || post.publishDate) &&
          <div className={`text-sm font-medium ${(appearanceSettings.showPostCardAuthor && authorData) && appearanceSettings.showPostCardCategory && post.category ? 'w-full sm:w-auto mt-2 sm:mt-0' : ''}`}>{convertDate(post.date || post.publishDate)}</div>
        }
      </div>
      {appearanceSettings.showPostCardSnippet &&
        <div className='w-full mb-3 leading-7 line-clamp-4'>{post.snippet || post.description}</div>
      }
      {appearanceSettings.showPostCardReadMoreButton && post.slug &&
        <div className={`${appearanceSettings.colorPostCardReadMoreTextDark ? `dark:text-${appearanceSettings.colorPostCardReadMoreTextDark}` : 'dark:text-white' } ${appearanceSettings.colorPostCardReadMoreTextLight ? `text-${appearanceSettings.colorPostCardReadMoreTextLight}` : 'dark:text-gray-800' }`}>
          <ReadMore slug={post.slug}></ReadMore>
        </div>
      }
    </div>
  )
}

export default PostCard