import getFrontmatter from '../_components/getFrontmatter'
import { getEggspressSettings, getString } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import PaginationLink from '../_components/PaginationLink'
import Setup from '../_components/Setup'
import ContentHero from '../_components/ContentHero'
import ContentMessage from '../_components/ContentMessage'

export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')

  return {
    title: {
      absolute: blogSettings.indexTitle || blogSettings.title,
    },
  }
}

export default async function Home() {
  const blogSettings = await getEggspressSettings('metadata')
  const appearanceSettings = await getEggspressSettings('appearance')
  const postFrontmatter = await getFrontmatter(
    'posts',
    appearanceSettings.orderPostsBy,
    appearanceSettings.orderPostsByReversed
  )

  if (blogSettings && blogSettings.code && blogSettings.code === 'ENOENT') {
    return <Setup></Setup>
  }

  return (
    <main className="flex flex-wrap">
      <ContentHero
        headline={blogSettings.title}
        subtitle={blogSettings.subtitle}
        subheading={blogSettings.subheading}
        headlineSeparator={blogSettings.indexHeadlineSuffix}
        subtitlePrefix={blogSettings.indexSubtitlePrefix}
        sectionString={blogSettings.subsubheading}
      ></ContentHero>

      <ContentMessage frontmatter={{ contentMessage: blogSettings.indexMessage }} />

      <div className="flex justify-between w-full ">
        <div className="lg:max-w-prose">
          {postFrontmatter.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((frontmatter, index) => (
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter} index={index}></PostCard>
          ))}
          {postFrontmatter && !postFrontmatter.length && (
            <div className="dark:text-gray-200">There are currently no posts to display.</div>
          )}
          {postFrontmatter.length > (appearanceSettings.numberOfPostsPerPage || 8) && (
            <div className="my-12">
              <div className="text-sm mb-2 text-gray-800 dark:text-gray-100">
                {await getString('paginationRangePrefix', 'Displaying posts ')}1 -{' '}
                {appearanceSettings.numberOfPostsPerPage || 8}
                {await getString('paginationRangeSuffix', '')}
                {await getString('paginationTotalCountPrefix', ' of ')}
                {postFrontmatter.length}
                {await getString('paginationTotalCountSuffix', '')}
              </div>
              <PaginationLink
                text={await getString('showMorePostsButtonLabel', 'Show more posts')}
                page={2}
              ></PaginationLink>
            </div>
          )}
        </div>

        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
    </main>
  )
}
