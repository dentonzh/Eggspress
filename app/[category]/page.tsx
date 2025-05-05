import React from 'react'
import getFrontmatter from '../_components/getFrontmatter'
import { createSlug, getEggspressSettings, getString } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import PaginationLink from '../_components/PaginationLink'
import ContentHero from '../_components/ContentHero'
import ContentMessage from '../_components/ContentMessage'

export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const categorySlugsAsSet = new Set(
    postFrontmatter
      .filter(post => {
        if (!post.category) {
          return false
        }
        return true
      })
      .map(post => ({
        category: createSlug(post.category),
      }))
  )
  const categorySlugsAsArray = Array.from(categorySlugsAsSet)
  return categorySlugsAsArray
}

export async function generateMetadata(props: { params: Promise<{ category: string }> }) {
  const params = await props.params;
  const { category } = params
  const postFrontmatter = await getFrontmatter('posts')
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)
  const blogSettings = await getEggspressSettings('metadata')

  const categoryFrontmatter = await getFrontmatter('categories', 'alphabetical', false, true)
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
      siteName: blogSettings.title,
    },
    robots: {
      index: categoryData && categoryData.isVisible === false ? false : true,
    },
  }
}

const CategoryPage = async (props: { params: Promise<{ category: string }> }) => {
  const params = await props.params;
  const { category } = params
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryFrontmatter = await getFrontmatter('categories', 'alphabetical', false, true)
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === category)[0]

  const postFrontmatter = await getFrontmatter(
    'posts',
    (categoryData && categoryData.orderPostsBy) || appearanceSettings.orderPostsInCategoriesBy,
    (categoryData && categoryData.orderPostsByReversed) || appearanceSettings.orderPostsInCategoriesByReversed
  )
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)

  let categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)
  if (categoryData) {
    categoryName = categoryData.title
  }

  categoryName = categoryName || category

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={categoryName}
        subheading={categoryData && categoryData.subheading ? categoryData.subheading : ''}
      ></ContentHero>

      <ContentMessage frontmatter={categoryData} />

      <div className="flex justify-between w-full">
        <div className="max-w-prose">
          {filteredPosts.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((post, index) => (
            <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
          ))}
          {filteredPosts && !filteredPosts.length && (
            <div className="dark:text-gray-200">There are currently no posts to display.</div>
          )}
          {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) && (
            <div className="py-12">
              <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
                {appearanceSettings.paginatedSubheadingIndexPrefix}1 - {appearanceSettings.numberOfPostsPerPage || 8}
                {appearanceSettings.paginatedSubheadingTotalPrefix}
                {filteredPosts.length}
                in {categoryName}
              </div>
              <PaginationLink
                text={await getString('showMorePostsButtonLabel', 'Show more posts')}
                page={2}
                type="category"
                slug={category}
              ></PaginationLink>
            </div>
          )}
        </div>
        {categoryData && categoryData.sidebar && (
          <div>
            <PageSidebar slug={categoryData.sidebar}></PageSidebar>
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryPage
