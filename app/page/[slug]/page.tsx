import React from 'react'
import getSlugs from '../../_components/getSlugs'
import compileContent from '@/app/_components/compileContent'
import Sidebar from '../../_components/Sidebar'
import { createSlug, getEggspressSettings } from '../../utils'
import Toc from '../../_components/Toc'
import Link from 'next/link'
import PageSidebar from '@/app/_components/PageSidebar'

const env = process.env.NODE_ENV

export async function generateStaticParams() {
  const slugs = getSlugs('pages')
  return slugs
}

export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { frontmatter }: {content: any, frontmatter: any} = await compileContent('pages', slug)
  const blogSettings = await getEggspressSettings('metadata')

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.snippet,
    url: `/${slug}`,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.snippet,
      url: `/${slug}`,
      type: 'article',
      siteName: blogSettings.title
    }

  }
}

const convertDate = (inputDate: string) => {
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return formattedDate
}

const PagePage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter } = await compileContent('pages', slug)
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        {frontmatter.category && <Link href={`/${createSlug(frontmatter.category)}`}><div className="mb-3">{frontmatter.category}</div></Link>}
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{`${frontmatter.title}`}</h1>   
        <div className="font-normal">{frontmatter.tagline || ''}</div>
        <div>{frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className="overflow-x-hidden">
          <div className="mb-12 lg:hidden">
            <Toc />
          </div>
          <div className="prose dark:prose-invert">
            {content}
          </div>
        </div>
        <div>
          <PageSidebar slug={frontmatter.sidebar}></PageSidebar>
          <Sidebar>
            <Toc />
          </Sidebar>
        </div>
      </div>
    </div>
  )
}

export default PagePage
