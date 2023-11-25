import getFrontmatter from '../_components/getFrontmatter'
import { getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import PaginationLink from '../_components/PaginationLink'
import Setup from '../_components/Setup'


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.indexTitle || blogSettings.title
    }
  }
}

export default async function Home() {
  const postFrontmatter = await getFrontmatter('posts')
  const blogSettings = await getEggspressSettings('metadata')
  const appearanceSettings = await getEggspressSettings('appearance')

  if (blogSettings && blogSettings.code && blogSettings.code === 'ENOENT') {
    return (
      <Setup></Setup>
    )
  }

  return (
    <main className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-4 -ml-0.5">{blogSettings.title || 'Eggspress'}</h1>      
        <div className="font-normal">{blogSettings.tagline || 'The lightweight blog made for everyone 🌎'}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='lg:max-w-prose'>
          {postFrontmatter.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((frontmatter, index) => 
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter} index={index}></PostCard>
          )}
          {postFrontmatter.length > (appearanceSettings.numberOfPostsPerPage || 8) &&
          <div className="py-12">
            <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
              Displaying posts 1 - {(appearanceSettings.numberOfPostsPerPage || 8)} of {postFrontmatter.length}
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
