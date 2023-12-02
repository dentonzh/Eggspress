import getFrontmatter from '../_components/getFrontmatter'
import { getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import PaginationLink from '../_components/PaginationLink'
import Setup from '../_components/Setup'
import ContentHero from '../_components/ContentHero'


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.indexTitle || blogSettings.title
    }
  }
}

export default async function Home() {
  const blogSettings = await getEggspressSettings('metadata')
  const appearanceSettings = await getEggspressSettings('appearance')
  const postFrontmatter = await getFrontmatter('posts', appearanceSettings.orderPostsBy, appearanceSettings.orderPostsByReversed)

  if (blogSettings && blogSettings.code && blogSettings.code === 'ENOENT') {
    return (
      <Setup></Setup>
    )
  }

  return (
    <main className="flex flex-wrap">
      <ContentHero
        headline={blogSettings.title || 'Eggspress'}
        subtitle={blogSettings.subtitle || 'The lightweight blog made for everyone 🌎'}
        subheading={blogSettings.subheading}
        headlineSeparator={blogSettings.indexHeadlineSeparator}
        subtitlePrefix={blogSettings.indexSubtitlePrefix}
      >
      </ContentHero>
      <div className="flex justify-between w-full">
        <div className='lg:max-w-prose'>
          {postFrontmatter.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((frontmatter, index) => 
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter} index={index}></PostCard>
          )}
          {postFrontmatter.length > (appearanceSettings.numberOfPostsPerPage || 8) &&
          <div className="mb-12">
            <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
              {appearanceSettings.paginatedSubheadingIndexPrefix}1 - {appearanceSettings.numberOfPostsPerPage || 8}{appearanceSettings.paginatedSubheadingTotalPrefix}{postFrontmatter.length}
            </div>
            <PaginationLink text="Show more posts" page={2}></PaginationLink>
          </div>
          }
        </div>
        

        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
    </main>
  )
}
