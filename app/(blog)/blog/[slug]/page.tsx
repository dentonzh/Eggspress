import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import getPostContent from '../../../_components/getPostContent'
import getPostSlugs from '../../../_components/getPostSlugs'
import Sidebar from '../../../_components/Sidebar'
import { createSlug, getEggspressSettings } from '@/app/utils'
import Toc from '../../../_components/Toc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import Link from 'next/link'
import transformImgAttrs from '@/plugins/transform-img-src'

const fs = require('fs-extra')
const sizeOf = require('image-size')

const env = process.env.NODE_ENV

export async function generateStaticParams() {
  const slugs = getPostSlugs()
  return slugs
}

export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { content, frontmatter, images }: { content: any, frontmatter: Record<any, unknown>, images: {url: string, width: string, height: string}[] } = await getSource(slug)
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
  const { content, frontmatter }: {content: any, frontmatter: any} = await getSource(slug)
  const appearanceSettings = await getEggspressSettings('appearance')

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
  const { markdownData, imageFiles } = await getPostContent(slug)
  const source = await compileMDX({
    source: markdownData,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, [transformImgAttrs, { slug, imageFiles }]],
        rehypePlugins: [rehypeSlug]
      }
    }})

  const images = imageFiles.map(image => {
    const imageFile = `/images/${slug}/${image.name}`
    if (fs.existsSync(`public/${imageFile}`)) {
      const dimensions = sizeOf(`${image.path}/${image.name}`)
      return {
        url: imageFile,
        width: dimensions.width,
        height: dimensions.height
      }
    } else {
      return {
        url: '',
        width: '',
        height: ''
      }
    }
  }).filter(image => image.url.length)

  return {...source, images}
}
