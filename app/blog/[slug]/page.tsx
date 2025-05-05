import React from 'react'
import compileContent from '../../_components/compileContent'
import getSlugs from '../../_components/getSlugs'
import Sidebar from '../../_components/Sidebar'
import { createSlug, getColors, getEggspressSettings, getString } from '@/app/utils'
import Toc from '../../_components/Toc'
import Link from 'next/link'
import AuthorCard from '@/app/_components/AuthorCard'
import PageSidebar from '@/app/_components/PageSidebar'
import Image from 'next/image'
import getFrontmatter from '@/app/_components/getFrontmatter'
import PostCard from '@/app/_components/PostCard'
import ContentHero from '@/app/_components/ContentHero'
import ContentMessage from '@/app/_components/ContentMessage'
import ShareBar from '@/app/_components/ShareBar'

export async function generateStaticParams() {
  const slugs = getSlugs('posts')
  return slugs
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params
  const { frontmatter, images } = await compileContent('posts', slug)

  return {
    title: frontmatter.title,
    description: frontmatter.description || frontmatter.snippet,
    url: `/${slug}`,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description || frontmatter.snippet,
      url: `/${slug}`,
      type: 'article',
      siteName: frontmatter.title,
      images: images,
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

const PostPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const { slug } = params
  const { content, frontmatter } = await compileContent('posts', slug)
  const authors =
    frontmatter && frontmatter.author
      ? frontmatter.author.split(',').map((author: string) => author.trim().replaceAll('_', '-').replaceAll(' ', '-'))
      : []
  const appearanceSettings = await getEggspressSettings('appearance')
  const metadataSettings = await getEggspressSettings('metadata')

  const postFrontmatter = await getFrontmatter('posts')
  const prevPost = postFrontmatter.filter(
    post => frontmatter.prevPost && post.slug === frontmatter.prevPost.replaceAll('_', '-').replaceAll(' ', '-')
  )[0]
  const nextPost = postFrontmatter.filter(
    post => frontmatter.nextPost && post.slug === frontmatter.nextPost.replaceAll('_', '-').replaceAll(' ', '-')
  )[0]

  let relatedPosts = []
  for (let i = 1; i < 10; i++) {
    const postData = postFrontmatter.filter(
      fm =>
        frontmatter['relatedPost' + i] &&
        fm.slug === frontmatter['relatedPost' + i].replaceAll('_', '-').replaceAll(' ', '-')
    )
    const relatedPostFrontmatter = postData[0]

    if (relatedPostFrontmatter) {
      relatedPosts.push(relatedPostFrontmatter)
    }
  }

  const categoryFrontmatter = await getFrontmatter('categories', 'alphabetical', false, true)
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === frontmatter.category)[0]
  const categoryName = categoryData && categoryData.title ? categoryData.title : frontmatter.category

  return (
    <div className="flex flex-wrap">
      <ContentHero
        sectionString={categoryName}
        sectionLink={`/${createSlug(frontmatter.category)}`}
        headline={frontmatter.title || 'Untitled Post'}
        subtitle={frontmatter.subtitle}
        subheading={frontmatter.subheading}
        date={
          frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''
        }
        imageSrc={frontmatter.image && frontmatter.showImageInHeader ? `/images/${slug}/${frontmatter.image}` : ''}
        showShareButton={
          (appearanceSettings.showShareButtonInHeader || appearanceSettings.showShareButtonInHeader === undefined) &&
          !frontmatter.isContentHidden &&
          frontmatter.isVisible
            ? true
            : false
        }
      ></ContentHero>

      <ContentMessage frontmatter={frontmatter} />

      <div className="flex justify-between w-full">
        <div className="overflow-x-hidden">
          {(appearanceSettings.showTableOfContentsOnMobile === undefined ||
            appearanceSettings.showTableOfContentsOnMobile) && (
            <div className="lg:hidden">
              <Toc
                jumpToText={await getString('jumpToHeadingText', 'Jump to...')}
                tableOfContentsText={await getString('tableOfContentsHeadingText', 'Table of Contents')}
                backToTopText={await getString('backToTopButtonLabel', 'Back to top')}
              />
            </div>
          )}
          <div className={`eggspress-content eggspress-content-extended`}>
            {frontmatter.isContentHidden ? (
              <div>
                <h2 id="hero-subtitle">{await getString('isContentHiddenBodyHeadingText')}</h2>
                <p>{await getString('isContentHiddenBodyContentText')}</p>
              </div>
            ) : (
              <div id="content-body">{content}</div>
            )}
          </div>

          {(appearanceSettings.showShareButtonInPostContent === undefined ||
            appearanceSettings.showShareButtonInPostContent) &&
            !frontmatter.isContentHidden &&
            frontmatter.isVisible && (
              <div className="w-full">
                <div className={`font-light text-sm mb-5 ${await getColors('text', 'SidebarHeading')}`}>
                  {await getString('sharePostHeadingText', 'Share this post')}
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

          {(nextPost || prevPost) && (
            <div className="flex flex-wrap border-t border-gray-300 dark:border-gray-600 mt-12 py-6 text-gray-800 dark:text-gray-200 justify-between">
              {prevPost && (
                <Link className="grow my-3 mr-2" href={`/blog/${prevPost.slug}`}>
                  <div className="text-sm font-light mb-2">
                    {await getString('previousPostButtonLabel', 'Previous Post')}
                  </div>
                  <div className="font-semibold">{prevPost.title}</div>
                </Link>
              )}
              {nextPost && (
                <Link className="grow my-3" href={`/blog/${nextPost.slug}`}>
                  <div className="text-sm font-light mb-2">{await getString('nextPostButtonLabel', 'Next Post')}</div>
                  <div className="font-semibold">{nextPost.title}</div>
                </Link>
              )}
            </div>
          )}

          {authors.length > 0 && (
            <div
              className={`${nextPost || prevPost ? '' : 'mt-12'} flex lg:hidden px-1 border-t border-gray-300 dark:border-gray-600 -mb-16 pt-12`}
            >
              <div className="md:w-5/6">
                {authors.map((author: string) => (
                  <AuthorCard key={`author-body-${author}`} slug={author}></AuthorCard>
                ))}
              </div>
            </div>
          )}

          {relatedPosts.length > 0 ? (
            <div
              className={`${nextPost || prevPost || authors.length ? '' : 'mt-12'} flex border-t border-gray-300 dark:border-gray-600 pt-12 mt-12 md:pt-20 md:mt-0`}
            >
              <div className="mb-8 max-w-prose">
                <div className="flex flex-wrap mb-6">
                  <Image
                    src="/assets/relation.svg"
                    alt="relation icon"
                    width={32}
                    height={32}
                    className="h-7 w-7 border-gray-300 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"
                  ></Image>
                  <div className="font-medium text-gray-700 dark:text-gray-300 my-auto pl-2">
                    {await getString('relatedPostHeadingText', 'Related Posts')}
                  </div>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
                  const postData = postFrontmatter.filter(
                    fm =>
                      (fm.isVisible || fm.isVisible === undefined) &&
                      frontmatter['relatedPost' + index] &&
                      fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-')
                  )

                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="flex flex-wrap mb-12" key={`related-post-sidebar-${index}`}>
                        <div className="w-full font-normal text-gray-600 dark:text-gray-300">
                          <PostCard post={frontmatter} index={0} priority={false}></PostCard>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          ) : (
            <div className="mb-16"></div>
          )}
        </div>
        <div className="mb-20 mt-5 h-full">
          <Sidebar isSticky={false}>
            <div>
              {authors.map((author: string) => (
                <AuthorCard key={`author-sidebar-${author}`} slug={author}></AuthorCard>
              ))}
            </div>
          </Sidebar>

          {(appearanceSettings.showShareButtonInPostSidebar === undefined ||
            appearanceSettings.showShareButtonInPostSidebar) &&
            !frontmatter.isContentHidden &&
            frontmatter.isVisible && (
              <Sidebar isSticky={false}>
                <div className="mb-20 text-sm flex flex-wrap">
                  <div className={`w-full sidebar-section ${await getColors('text', 'SidebarHeading')}`}>
                    {await getString('sharePostHeadingText', 'Share this post')}
                  </div>
                  <ShareBar
                    appearanceSettings={appearanceSettings}
                    className="-ml-6"
                    headline={frontmatter.title || 'Untitled Post'}
                    subtitle={frontmatter.subtitle}
                    siteName={metadataSettings.title}
                  ></ShareBar>
                </div>
              </Sidebar>
            )}

          <Sidebar isSticky={false}>
            {relatedPosts.length > 0 && (
              <div className="mb-16">
                <div className="flex flex-wrap mb-3">
                  <Image
                    src="/assets/relation.svg"
                    alt="relation icon"
                    width={32}
                    height={32}
                    className="h-5 w-5 -ml-4 opacity-50 dark:opacity-100 border-gray-300 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"
                  ></Image>
                  <div className={`sidebar-heading text-sm pl-1 ${await getColors('text', 'SidebarHeading')}`}>
                    {await getString('relatedPostHeadingText', 'Related Posts')}
                  </div>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
                  const postData = postFrontmatter.filter(
                    fm =>
                      (fm.isVisible || fm.isVisible === undefined) &&
                      frontmatter['relatedPost' + index] &&
                      fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-')
                  )

                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="mb-0.5 text-sm" key={`related-post-footer-${index}`}>
                        <div
                          className={`font-normal ${await getColors('text', 'SidebarRelatedPost', 'gray-300', 'gray-600')}`}
                        >
                          <Link
                            className={`flex ${await getColors('hover:text', 'SidebarRelatedPostHover', 'blue-300', 'blue-700')}`}
                            href={`/blog/${frontmatter.slug}`}
                          >
                            <svg
                              width="3"
                              height="24"
                              viewBox="0 -6 3 24"
                              className={
                                'mr-2 -ml-0.5 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400'
                              }
                            >
                              <path
                                d="M0 0L3 3L0 6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              ></path>
                            </svg>
                            <div className="underline-animated mb-1">{frontmatter.title}</div>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            )}
          </Sidebar>
          <PageSidebar isSticky={false} slug={frontmatter.sidebar}></PageSidebar>
          {(appearanceSettings.showTableOfContentsInSidebar === undefined ||
            appearanceSettings.showTableOfContentsInSidebar) && (
            <Sidebar>
              <Toc
                jumpToText={await getString('jumpToHeadingText', 'Jump to...')}
                tableOfContentsText={await getString('tableOfContentsHeadingText', 'Table of Contents')}
                backToTopText={await getString('backToTopButtonLabel', 'Back to top')}
              />
            </Sidebar>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostPage
