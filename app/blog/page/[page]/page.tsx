import getFrontmatter from '../../../_components/getFrontmatter'
import { getEggspressSettings } from '../../../utils'
import PostCard from '../../../_components/PostCard'
import PageSidebar from '../../../_components/PageSidebar'
import PaginationCard from '../../../_components/PaginationCard'
import ContentHero from '@/app/_components/ContentHero'


export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const pageCount = Math.ceil(postFrontmatter.length / (appearanceSettings.numberOfPostsPerPage || 8))
  let pages = []

  for (let i = 0; i < pageCount; i ++) {
    pages.push({page: (+i + 1).toString()})
  }
  return pages
}


export async function generateMetadata({ params }: { params: { page: string } }) {
  const { page } = params

  return {
    title: `Page ${page} - Posts`
  }
}

export default async function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const { page } = params
  const pageNumber = parseInt(page)
  const appearanceSettings = await getEggspressSettings('appearance')
  
  const postFrontmatter = await getFrontmatter('posts', appearanceSettings.orderPostsBy, appearanceSettings.orderPostsByReversed)
  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8

  const endIndex = pageNumber * numPostsPerPage > postFrontmatter.length ? postFrontmatter.length : pageNumber * numPostsPerPage
  const startIndex = pageNumber * numPostsPerPage - numPostsPerPage > postFrontmatter.length ? endIndex - numPostsPerPage : pageNumber * numPostsPerPage - numPostsPerPage

  return (
    <main className="flex flex-wrap">
      <ContentHero
        headline={'Posts'}
        subtitle={page}
        subtitlePrefix={appearanceSettings.paginatedPostSubtitlePrefix}
        subheading={`${appearanceSettings.paginatedSubheadingIndexPrefix}${startIndex + 1} - ${endIndex}${appearanceSettings.paginatedSubheadingTotalPrefix}${postFrontmatter.length}`}
      ></ContentHero>
      <div className="flex justify-between w-full">
        <div className='lg:max-w-prose'>
          {postFrontmatter.slice(startIndex, endIndex).map((frontmatter, index) => 
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter} index={index}></PostCard>
          )}
        </div>
        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
      <PaginationCard currentPage={page} startIndex={startIndex} endIndex={endIndex} postCount={postFrontmatter.length}></PaginationCard>
    </main>
  )
}
