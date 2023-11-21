import getFrontmatter from '../_components/getFrontmatter'
import { getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import PageSidebar from '../_components/PageSidebar'
import Setup from '../_components/Setup'


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.title
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
        <div className='max-w-prose'>
          {postFrontmatter.map(frontmatter => 
            <PostCard key={frontmatter.slug} post={frontmatter}></PostCard>
          )}
        </div>
        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
    </main>
  )
}
