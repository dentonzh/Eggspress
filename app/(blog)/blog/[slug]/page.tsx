import React from 'react'
import compileContent from '../../../_components/compileContent'
import getSlugs from '../../../_components/getSlugs'
import Sidebar from '../../../_components/Sidebar'
import { createSlug, getEggspressSettings } from '@/app/utils'
import Relation from '@/public/assets/relation.svg'
import Toc from '../../../_components/Toc'
import Link from 'next/link'
import AuthorCard from '@/app/_components/AuthorCard'
import PageSidebar from '@/app/_components/PageSidebar'
import Image from 'next/image'
import getFrontmatter from '@/app/_components/getFrontmatter'
import PostCard from '@/app/_components/PostCard'


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
  const authors = frontmatter && frontmatter.author ? frontmatter.author.split(',').map((author: string) => author.trim().replaceAll('_', '-').replaceAll(' ', '-')) : []

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        {frontmatter && frontmatter.category && <Link href={`/${createSlug(frontmatter.category)}`}><div className="mb-3">{frontmatter.category}</div></Link>}
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{`${frontmatter.title || 'Untitled Post'}`}</h1>      
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
          {
            authors.length &&
            <div className="flex lg:hidden px-1 border-t mt-12 -mb-16 pt-12">
              <div className="md:w-5/6">
                {authors.map((author: string) => 
                  <AuthorCard key={`author-body-${author}`} slug={author}></AuthorCard>
                )}
              </div>
            </div>
          }

          {(frontmatter.relatedPost1 || frontmatter.relatedPost2 || frontmatter.relatedPost3 || frontmatter.relatedPost4)
            ?
            <div className="flex border-t mt-12 pt-12 max-w-prose">
              <div className="mb-8">
                <div className="flex flex-wrap mb-3">
                  <Image src={Relation} alt="relation icon" className="h-7 w-7 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"></Image>
                  <div className="font-medium text-gray-700 dark:text-gray-300 my-auto pl-2">Related Posts</div>
                </div>
                {[1, 2, 3, 4].map(async (index: number) => {
                  const postFrontmatter = await getFrontmatter('posts')
                  const postData = postFrontmatter.filter(fm => fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-'))
        
                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="flex flex-wrap mb-3" key={`related-post-sidebar-${index}`}>
                        <div className="w-full font-normal text-gray-600 dark:text-gray-300">
                          <PostCard post={frontmatter}></PostCard>
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
        <div className="mb-20">
          <Sidebar isSticky={false}>
            <div>
              {authors.map((author: string) => 
                <AuthorCard key={`author-sidebar-${author}`} slug={author}></AuthorCard>
              )}
            </div>
          </Sidebar>
          <Sidebar isSticky={false}>
            {(frontmatter.relatedPost1 || frontmatter.relatedPost2 || frontmatter.relatedPost3 || frontmatter.relatedPost4) && 
              <div className="mb-16">
                <div className="flex flex-wrap mb-3">
                  <Image src={Relation} alt="relation icon" className="h-5 w-5 -ml-1 dark:border-gray-600 stroke-gray-200 fill-gray-200 brightness-50 dark:brightness-100"></Image>
                  <div className="font-medium text-sm text-gray-600 dark:text-gray-300 my-auto pl-1">Related Posts</div>
                </div>
                {[1, 2, 3, 4].map(async (index: number) => {
                  const postFrontmatter = await getFrontmatter('posts')
                  const postData = postFrontmatter.filter(fm => fm.slug === frontmatter['relatedPost' + index].replaceAll('_', '-').replaceAll(' ', '-'))
        
                  if (postData.length) {
                    const frontmatter = postData[0]
                    return (
                      <div className="mb-0.5 text-sm" key={`related-post-footer-${index}`}>
                        <div className="font-normal text-gray-600 dark:text-gray-300">
                          <Link className="flex hover:text-blue-700 dark:hover:text-blue-300" href={`/blog/${frontmatter.slug}`}>
                            <svg width="3" height="24" viewBox="0 -6 3 24" 
                              className={"mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400"}
                            >
                              <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                            {frontmatter.title}
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
