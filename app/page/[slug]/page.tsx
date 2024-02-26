import React from 'react'
import getSlugs from '../../_components/getSlugs'
import compileContent from '@/app/_components/compileContent'
import Sidebar from '../../_components/Sidebar'
import { createSlug, getColors, getEggspressSettings, getString } from '../../utils'
import Toc from '../../_components/Toc'
import PageSidebar from '@/app/_components/PageSidebar'
import ContentHero from '@/app/_components/ContentHero'
import ContentMessage from '@/app/_components/ContentMessage'
import ShareBar from '@/app/_components/ShareBar'

const env = process.env.NODE_ENV

export async function generateStaticParams() {
  const slugs = getSlugs('pages')
  return slugs
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params
  const { frontmatter }: { content: any; frontmatter: any } = await compileContent('pages', slug)
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
      siteName: blogSettings.title,
    },
    robots: {
      index: frontmatter.isVisible === false ? false : true,
    },
  }
}

const convertDate = (inputDate: string) => {
  const date = new Date(inputDate)
  const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  return formattedDate
}

const PagePage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params
  const { content, frontmatter } = await compileContent('pages', slug)
  const appearanceSettings = await getEggspressSettings('appearance')
  const metadataSettings = await getEggspressSettings('metadata')

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={frontmatter.title || slug}
        subtitle={frontmatter.subtitle || ''}
        sectionString={frontmatter.category}
        sectionLink={frontmatter.category ? `/${createSlug(frontmatter.category)}` : ''}
        date={
          frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''
        }
      ></ContentHero>

      <ContentMessage frontmatter={frontmatter} />

      <div className="flex justify-between w-full">
        <div className="overflow-x-hidden">
          <div className="lg:hidden">
            <Toc
              jumpToText={await getString('jumpToHeadingText', 'Jump to...')}
              tableOfContentsText={await getString('tableOfContentsHeadingText', 'Table of Contents')}
              backToTopText={await getString('backToTopButtonLabel', 'Back to top')}
            />
          </div>
          <div className={`eggspress-content eggspress-content-extended -mt-2`}>
            {frontmatter.isContentHidden ? (
              <div>
                <h2 id="hero-subtitle">{await getString('isContentHiddenBodyHeadingText')}</h2>
                <p>{await getString('isContentHiddenBodyContentText')}</p>
              </div>
            ) : (
              <div id="content-body">{content}</div>
            )}
          </div>
          {(appearanceSettings.showShareButtonInPageContent === undefined ||
            appearanceSettings.showShareButtonInPageContent) &&
            !frontmatter.isContentHidden &&
            frontmatter.isVisible && (
              <div className="w-full">
                <div className={`font-light text-sm mb-5 ${await getColors('text', 'SidebarHeading')}`}>
                  {await getString('sharePageHeadingText', 'Share this page')}
                </div>
                <div className="w-full text-center border rounded-lg py-2 border-gray-200/40 dark:border-gray-600/40 bg-gray-200/20 dark:bg-gray-900/20">
                  <ShareBar
                    appearanceSettings={appearanceSettings}
                    className="inline-block"
                    headline={frontmatter.title || 'Untitled Post'}
                    subtitle={frontmatter.subtitle}
                    siteName={metadataSettings.title}
                  ></ShareBar>
                </div>
              </div>
            )}
        </div>
        <div className="mt-4">
          {(appearanceSettings.showShareButtonInPageSidebar === undefined ||
            appearanceSettings.showShareButtonInPageSidebar) &&
            !frontmatter.isContentHidden &&
            frontmatter.isVisible && (
              <Sidebar isSticky={false}>
                <div className="mb-20 text-sm flex flex-wrap">
                  <div className={`w-full sidebar-section ${await getColors('text', 'SidebarHeading')}`}>
                    {await getString('sharePageHeadingText', 'Share this page')}
                  </div>
                  <ShareBar
                    appearanceSettings={appearanceSettings}
                    className="-ml-6"
                    headline={frontmatter.title || 'Untitled Page'}
                    subtitle={frontmatter.subtitle}
                    siteName={metadataSettings.title}
                  ></ShareBar>
                </div>
              </Sidebar>
            )}

          <PageSidebar isSticky={false} slug={frontmatter.sidebar}></PageSidebar>

          <Sidebar>
            <Toc
              jumpToText={await getString('jumpToHeadingText', 'Jump to...')}
              tableOfContentsText={await getString('tableOfContentsHeadingText', 'Table of Contents')}
              backToTopText={await getString('backToTopButtonLabel', 'Back to top')}
            />
          </Sidebar>
        </div>
      </div>
    </div>
  )
}

export default PagePage
