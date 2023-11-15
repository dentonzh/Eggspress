import React from 'react'
import compileContent from '../../../_components/compileContent'
import getSlugs from '../../../_components/getSlugs'
import Sidebar from '../../../_components/Sidebar'
import { createSlug, getEggspressSettings } from '@/app/utils'
import Toc from '../../../_components/Toc'
import Link from 'next/link'
import AuthorCard from '@/app/_components/AuthorCard'


export async function generateStaticParams() {
  const slugs = getSlugs('posts')
  return slugs
}

export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { frontmatter, images } = await compileContent('posts', slug)
  const blogSettings = await getEggspressSettings('metadata')


  return {
    title: `${frontmatter.title} - ${blogSettings.title}`,
    description: frontmatter.description || frontmatter.snippet,
    url: `/${slug}`,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.snippet,
      url: `/${slug}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images
    }
  }
}

const convertDate = (inputDate: string) => {
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}

const PostPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter } = await compileContent('posts', slug)
  const appearanceSettings = await getEggspressSettings('appearance')
  const authors = frontmatter.author.split(',').map((author: string) => author.trim())

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        {frontmatter.category && <Link href={`/${createSlug(frontmatter.category)}`}><div className="mb-3">{frontmatter.category}</div></Link>}
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{`${frontmatter.title}`}</h1>      
        <div>{frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="overflow-x-hidden">
          <div className="mb-12 lg:hidden">
            <div className="text-gray-500 dark:text-gray-300 font-bold">Jump to...</div>
            <Toc />
          </div>
          <div className="prose dark:prose-invert">
            {content}
          </div>
          <div className="flex lg:hidden px-1 border-t mt-12 pt-12">
            <div className="md:w-5/6">
              {authors.map((author: string) => 
                <AuthorCard key={`author-body-${author}`} slug={author}></AuthorCard>
              )}
            </div>
          </div>
        </div>
        <div className="mb-20">
          <Sidebar isSticky={false}>
            <div>
              {authors.map((author: string) => 
                <AuthorCard key={`author-sidebar-${author}`} slug={author}></AuthorCard>
              )}
            </div>
          </Sidebar>
          <Sidebar>
            <Toc />
          </Sidebar>
        </div>
    </div>
    </div>
  )
}

export default PostPage
