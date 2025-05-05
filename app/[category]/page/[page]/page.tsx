import getFrontmatter from '../../../_components/getFrontmatter'
import { createSlug, getEggspressSettings, getString } from '../../../utils'
import PostCard from '../../../_components/PostCard'
import PageSidebar from '../../../_components/PageSidebar'
import PaginationCard from '../../../_components/PaginationCard'
import ContentHero from '@/app/_components/ContentHero'
import ContentMessage from '@/app/_components/ContentMessage'

export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryMap: Record<any, any> = {}
  postFrontmatter.map(post => {
    categoryMap[createSlug(post.category)] = 1
  })

  let params: { category: string; page: string }[] = []

  Object.keys(categoryMap).map(categorySlug => {
    const postCount = postFrontmatter.filter(post => createSlug(post.category) === categorySlug).length
    const pageCount = Math.ceil(postCount / (appearanceSettings.numberOfPostsPerPage || 8))

    for (let i = 0; i < pageCount; i++) {
      if (categorySlug) {
        params.push({ category: categorySlug, page: (+i + 1).toString() })
      }
    }
  })

  return params
}

export async function generateMetadata(props: { params: Promise<{ category: string; page: string }> }) {
  const params = await props.params;
  const { category, page } = params

  const pageNumber = parseInt(page)
  const postFrontmatter = await getFrontmatter('posts')

  const categoryFrontmatter = await getFrontmatter('categories')
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === category)[0]
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)

  let categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)
  if (categoryData) {
    categoryName = categoryData?.title
  }

  categoryName = categoryName || category

  return {
    title: `Page ${pageNumber} - ${categoryName}`,
  }
}

export default async function CategoryPaginatedPage(props: { params: Promise<{ category: string; page: string }> }) {
  const params = await props.params;
  const { category, page } = params
  const pageNumber = parseInt(page)
  const appearanceSettings = await getEggspressSettings('appearance')

  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8

  const categoryFrontmatter = await getFrontmatter('categories')
  const categoryData = categoryFrontmatter.filter(fm => fm.slug === category)[0]

  const postFrontmatter = await getFrontmatter(
    'posts',
    (categoryData && categoryData?.orderPostsBy) || appearanceSettings.orderPostsInCategoriesBy,
    (categoryData && categoryData?.orderPostsByReversed) || appearanceSettings.orderPostsInCategoriesByReversed
  )
  const filteredPosts = postFrontmatter.filter(post => createSlug(post.category) === category)

  const endIndex =
    pageNumber * numPostsPerPage > filteredPosts.length ? filteredPosts.length : pageNumber * numPostsPerPage
  const startIndex =
    pageNumber * numPostsPerPage - numPostsPerPage > filteredPosts.length
      ? endIndex - numPostsPerPage
      : pageNumber * numPostsPerPage - numPostsPerPage

  let categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)
  if (categoryData) {
    categoryName = categoryData?.title
  }

  categoryName = categoryName || category

  return (
    <main className="flex flex-wrap">
      <ContentHero
        headline={categoryName}
        subtitle={`${page}${await getString('paginationTotalPagesSuffix', '')}`}
        subtitlePrefix={await getString('paginationTotalPagesPrefix', ' // Page')}
        subheading={`${categoryData?.subheading} ${categoryData?.subheading ? '•' : ''} ${await getString('paginationRangePrefix', 'Displaying posts ')}${startIndex + 1} - ${endIndex}${await getString('paginationRangeSuffix', '')}${await getString('paginationTotalCountPrefix', ' of ')}${postFrontmatter.length}${await getString('paginationTotalCountSuffix', '')}`}
      ></ContentHero>

      <ContentMessage frontmatter={categoryData} />

      <div className="flex justify-between w-full">
        <div className="lg:max-w-prose">
          {filteredPosts.slice(startIndex, endIndex).map((frontmatter, index) => (
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter} index={index}></PostCard>
          ))}
        </div>
        {categoryData && categoryData?.sidebar && (
          <div>
            <PageSidebar slug={categoryData?.sidebar}></PageSidebar>
          </div>
        )}
      </div>
      <PaginationCard
        currentPage={pageNumber}
        startIndex={startIndex}
        endIndex={endIndex}
        postCount={filteredPosts.length}
        type="category"
        slug={category}
      ></PaginationCard>
    </main>
  )
}
