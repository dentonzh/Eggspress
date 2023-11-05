import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import getPostContent from '../../../_components/getPostContent'
import getPostSlugs from '../../../_components/getPostSlugs'
import Sidebar from '../../../_components/Sidebar'
import { createSlug } from '@/app/utils'
import Toc from '../../_components/Toc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs
}

const convertDate = (inputDate: string) => {
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}

const PostPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter }: {content: any, frontmatter: any} = await getSource(slug)

  return (
    <div className="flex flex-wrap">
      <div className="w-full mb-12 pt-32 pb-12 duration-200 text-gray-800 dark:text-gray-100 bleed-bg bleed-slate-100 dark:bleed-gray-900">
        {frontmatter.category && <Link href={`/${createSlug(frontmatter.category)}`}><div className="mb-3">{frontmatter.category}</div></Link>}
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{`${frontmatter.title}`}</h1>      
        <div>{convertDate(frontmatter.publishDate)}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="overflow-x-hidden">
          <div className="mb-12 lg:hidden">
            <div className="text-blue-700 dark:text-blue-200 font-bold">Jump to...</div>
            <Toc />
          </div>
          <div className="prose dark:prose-invert">
            {content}
          </div>
        </div>
        <div>
          <Sidebar>
            <Toc />
          </Sidebar>
        </div>
    </div>
    </div>
  )
}

export default PostPage


async function getSource(slug: string) {
  const file = await getPostContent(slug)
  const source = await compileMDX({
    source: file,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug]
      }
    }})
  return source
}
