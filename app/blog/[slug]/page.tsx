import React from 'react'
import compileContent from '../../_components/compileContent'
import getSlugs from '../../_components/getSlugs'
import Sidebar from '../../_components/Sidebar'
import { createSlug, getColors, getEggspressSettings } from '@/app/utils'
import Toc from '../../_components/Toc'
import Link from 'next/link'
import AuthorCard from '@/app/_components/AuthorCard'
import PageSidebar from '@/app/_components/PageSidebar'
import Image from 'next/image'
import getFrontmatter from '@/app/_components/getFrontmatter'
import PostCard from '@/app/_components/PostCard'
import ContentHero from '@/app/_components/ContentHero'
import HiddenContentMessage from '@/app/_components/HiddenContentMessage'
import { PostponedPathnameNormalizer } from 'next/dist/server/future/normalizers/request/postponed'


export async function generateStaticParams() {
  const slugs = getSlugs('posts')
  return slugs
}

export async function generateMetadata({ params }: { params: {slug: string} }) {
  const { slug } = params
  const { frontmatter, images } = await compileContent('posts', slug)
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
      siteName: frontmatter.title,
      images: images
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

const PostPage =  async ( {params}: {params: {slug: string}} ) => {
  const { slug } = params
  const { content, frontmatter } = await compileContent('posts', slug)
  const authors = frontmatter && frontmatter.author ? frontmatter.author.split(',').map((author: string) => author.trim().replaceAll('_', '-').replaceAll(' ', '-')) : []
  const appearanceSettings = await getEggspressSettings('appearance')

  const postFrontmatter = await getFrontmatter('posts')
  const prevPost = postFrontmatter.filter(post => frontmatter.prevPost && post.slug === frontmatter.prevPost.replaceAll('_', '-').replaceAll(' ', '-'))[0]
  const nextPost = postFrontmatter.filter(post => frontmatter.nextPost && post.slug === frontmatter.nextPost.replaceAll('_', '-').replaceAll(' ', '-'))[0]
  
  let relatedPosts = []
  for (let i = 1; i < 10; i++ ) {
    const postData = postFrontmatter.filter(fm => frontmatter['relatedPost' + i] && fm.slug === frontmatter['relatedPost' + i].replaceAll('_', '-').replaceAll(' ', '-'))
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
        date={frontmatter.date || frontmatter.publishDate ? convertDate(frontmatter.date || frontmatter.publishDate) : ''}
        imageSrc={frontmatter.image && frontmatter.showImageInHeader ? `/images/${slug}/${frontmatter.image}` : ''}
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
          <div className={`eggspress-content eggspress-content-extended`}>
            {frontmatter.isVisible === false && (appearanceSettings.hiddenContentIsHidden === true || frontmatter.hideContent === true) ?
              <div>
                <h2 id="hero-subtitle">{appearanceSettings.hiddenContentIsHiddenMessageHeading}</h2>
                <p>{appearanceSettings.hiddenContentIsHiddenMessageBodyText}</p>
              </div>
              :
              <div className="">
                {content}
              </div>
            }
          </div>

          {(nextPost || prevPost) &&
              <div className="flex flex-wrap border-t dark:border-gray-700 mt-12 py-6 text-gray-800 dark:text-gray-200 justify-between">
                {prevPost &&
                <Link className="grow my-3" href={`/blog/${prevPost.slug}`}>
                    <div className="text-sm font-light mb-2">Previous Post</div>
                    <div className="font-semibold">{prevPost.title}</div>
                </Link>
                }
                {nextPost &&
                <Link className="grow my-3" href={`/blog/${nextPost.slug}`}>
                    <div className="text-sm font-light mb-2">Next Post</div>
                    <div className="font-semibold">{nextPost.title}</div>
                </Link>
                }
              </div>
          }

          {authors.length > 0 &&
            <div className={`${(nextPost || prevPost) ? '' : 'mt-12' } flex lg:hidden px-1 border-t dark:border-gray-700 -mb-16 pt-12`}>
              <div className="md:w-5/6">
                {authors.map((author: string) => 
                  <AuthorCard key={`author-body-${author}`} slug={author}></AuthorCard>
                )}
              </div>
            </div>
          }

          {relatedPosts.length > 0
            ?
            <div className={`${(nextPost || prevPost || authors.length) ? '' : 'mt-12'} flex border-t pt-20`}>
              <div className="mb-8 max-w-prose">
                <div className="flex flex-wrap mb-6">
                  <Image src="/assets/relation.svg" alt="relation icon" width={32} height={32} className="h-7 w-7 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"></Image>
                  <div className="font-medium text-gray-700 dark:text-gray-300 my-auto pl-2">Related Posts</div>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
                  const postData = postFrontmatter.filter(fm => frontmatter['relatedPost' + index] && fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-'))

                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="flex flex-wrap mb-3" key={`related-post-sidebar-${index}`}>
                        <div className="w-full font-normal text-gray-600 dark:text-gray-300">
                          <PostCard post={frontmatter} index={0} priority={false}></PostCard>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
            :
            <div className="mb-16"></div>
          }
        </div>

        <div className="mb-20 mt-8">
          <Sidebar isSticky={false}>
            <div>
              {authors.map((author: string) => 
                <AuthorCard key={`author-sidebar-${author}`} slug={author}></AuthorCard>
              )}
            </div>
          </Sidebar>
          <Sidebar isSticky={false}>
            {relatedPosts.length > 0 && 
              <div className="mb-16">
                <div className="flex flex-wrap mb-3">
                  <Image src="/assets/relation.svg" alt="relation icon" width={32} height={32} className="h-5 w-5 -ml-4 opacity-50 dark:opacity-100 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"></Image>
                  <div className="font-medium text-sm text-gray-600 dark:text-gray-300 my-auto pl-1">Related Posts</div>
                </div>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async (index: number) => {
                  const postData = postFrontmatter.filter(fm => frontmatter['relatedPost' + index] && fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-'))
        
                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="mb-0.5 text-sm" key={`related-post-footer-${index}`}>
                        <div className={`font-normal ${await getColors('text', 'SidebarRelatedPost', 'gray-300', 'gray-600')}`}>
                          <Link 
                            className={`flex ${await getColors('hover:text', 'SidebarRelatedPostHover', 'blue-300', 'blue-700')}`} 
                            href={`/blog/${frontmatter.slug}`}
                          >
                            <svg width="3" height="24" viewBox="0 -6 3 24" 
                              className={"mr-2 -ml-0.5 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400"}
                            >
                              <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                            <div className="underline-animated underline-dotted mb-1">
                              {frontmatter.title}
                            </div>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            }
          </Sidebar>
          <PageSidebar isSticky={false} slug={frontmatter.sidebar}></PageSidebar>
          <Sidebar>
            <Toc />
          </Sidebar>
        </div>
    </div>
    </div>
  )
}

export default PostPage
