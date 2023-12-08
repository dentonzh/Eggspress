import React from 'react'
import getSlugs from '../../_components/getSlugs'
import compileContent from '@/app/_components/compileContent'
import Sidebar from '../../_components/Sidebar'
import { createSlug, getEggspressSettings } from '../../utils'
import Toc from '../../_components/Toc'
import PageSidebar from '@/app/_components/PageSidebar'
import ContentHero from '@/app/_components/ContentHero'
import HiddenContentMessage from '@/app/_components/HiddenContentMessage'

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
    },
    robots: {
      index: frontmatter.isVisible === false ? false : true
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

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={frontmatter.title || slug}
        subtitle={frontmatter.subtitle || ''}
        sectionString={frontmatter.category}
        sectionLink={frontmatter.category ? `/${createSlug(frontmatter.category)}` : ''}
        date={frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''}
      >
      </ContentHero>
      {frontmatter.isVisible === false && 
        <HiddenContentMessage />
      }
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
          <PageSidebar isSticky={false} slug={frontmatter.sidebar}></PageSidebar>
          <Sidebar>
            <Toc />
          </Sidebar>
        </div>
      </div>
    </div>
  )
}

export default PagePage
