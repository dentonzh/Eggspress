import React from 'react'
import { compileMDX, MDXRemote } from 'next-mdx-remote/rsc'
// import { serialize } from 'next-mdx-remote/serialize'
// import remarkToc from 'remark-toc'
import getPostContent from '../../../_components/getPostContent'
import getPostSlugs from '../../../_components/getPostSlugs'
import TocSidebar from '../../_components/TocSidebar'

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs
}


const PostPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter } = await getSource(slug)
  // const data = await getSerializedData(params.slug)

  return (
    <div className="flex flex-wrap">
      <div className="prose dark:prose-invert">
      <h1 className=''>{`${frontmatter.title}`}</h1>
      {content}
      </div>
      <TocSidebar />
    </div>
  )
}

export default PostPage


async function getSource(slug: string) {
  const file = getPostContent(slug)
  const source = await compileMDX({
    source: file.content,
    options: {
      parseFrontmatter: true
    }})
  return source
}


// async function getSerializedData(slug: string) {
//   const file = getPostContent(slug)
//   const data = await serialize(file.content, {mdxOptions: {remarkPlugins: [remarkToc]}, parseFrontmatter: true})
//   return data
// }