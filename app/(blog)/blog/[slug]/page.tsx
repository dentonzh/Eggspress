import Link from 'next/link'
import React from 'react'
import { PostItem } from '@/types/Blog'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'
import remarkToc from 'remark-toc'
import getPostContent from '../../../_components/getPostContent'
import getPostSlugs from '../../../_components/getPostSlugs'
import { fileURLToPath } from 'url'


export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs
}


const PostPage =  async ( {params}: {params: {slug: string}} ) => {
  const { content, frontmatter } = await getSource(params.slug)
  const data = await getSerializedData(params.slug)

  return (
    <div className="flex flex-wrap">
      <div className="prose dark:prose-invert">
      <h1 className=''>{frontmatter.title}</h1>
      {content}
      </div>
      <div className='hidden xl:flex sticky top-0 max-h-screen grow py-12 px-6'>
        <div className='rounded-lg border-2 p-3 w-full'>
          <div className='font-bold text-sm text-blue-700'>Table of Contents</div>
        </div>
      </div>
    </div>
  )
}

export default PostPage


export async function getSource(slug: string) {
  const file = getPostContent(slug)
  const source = await compileMDX({
    source: file.content,
    options: {
      parseFrontmatter: true
    }})
  return source
}


export async function getSerializedData(slug: string) {
  const file = getPostContent(slug)
  const data = await serialize(file.content, {mdxOptions: {remarkPlugins: [remarkToc]}, parseFrontmatter: true})
  return data
}