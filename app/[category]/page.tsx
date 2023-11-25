import React from 'react'
import getFrontmatter from '../_components/getFrontmatter'
import { createSlug, getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import PaginationLink from '../_components/PaginationLink'

export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const categorySlugsAsSet = new Set(postFrontmatter.filter(post => 
      {if (!post.category) {return false} return true}
    ).map((post) => ({
      category: createSlug(post.category)
    })))
  const categorySlugsAsArray = Array.from(categorySlugsAsSet)
  return categorySlugsAsArray
}

export async function generateMetadata({ params }: { params: {category: string}}) {
  const { category } = params
  const postFrontmatter = await getFrontmatter('posts')
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)
  const blogSettings = await getEggspressSettings('metadata')
  
  const categoryFrontmatter = await getFrontmatter('categories')
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === category)[0]
  
  let categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)
  if (categoryData) {
    categoryName = categoryData.title
  }


  return {
    title: categoryName,
    description: `Read the latest ${categoryName} on ${blogSettings.title}`,
    url: `/${category}`,
    openGraph: {
      title: categoryName,
      description: `Read the latest ${categoryName} on ${blogSettings.title}`,
      url: `/${category}`,
      type: 'website',
      siteName: blogSettings.title
    }

  }
}

const CategoryPage = async ({ params }: { params: { category: string }}) => {
  const { category } = params
  const postFrontmatter = await getFrontmatter('posts')
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)
  const numbersAsWords: Record<number, string> = {0: 'No', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine'}
  const appearanceSettings = await getEggspressSettings('appearance')


  const categoryFrontmatter = await getFrontmatter('categories')
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === category)[0]
  
  let categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)
  if (categoryData) {
    categoryName = categoryData.title
  }

  categoryName = categoryName || category

  return (
    <div className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{ categoryName }</h1>
        {categoryData && categoryData.subtitle 
          ?
          <div>{categoryData.subtitle}</div>
          :
          <div>{filteredPosts.length < 10 ? numbersAsWords[filteredPosts.length] : filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</div>
        }
      </div>
      <div className="flex justify-between w-full">
        <div className='max-w-prose'>
          {postFrontmatter.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((post, index) => 
            <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
          )}
          {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) &&
          <div className="py-12">
            <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
              Displaying posts 1 - {(appearanceSettings.numberOfPostsPerPage || 8)} of {filteredPosts.length} in {categoryName}
            </div>
            <PaginationLink text="Show more posts" page={2} category={category}></PaginationLink>
          </div>
          }
        </div>
        {categoryData && categoryData.subtitle && 
          <div>
            <PageSidebar slug={categoryData.sidebar}></PageSidebar>
          </div>
        }
      </div>
    </div>
  )
}

export default CategoryPage