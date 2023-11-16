import getFrontmatter from '../_components/getFrontmatter'
import { getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import IndexSidebar from '../_components/IndexSidebar'


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

  return (
    <main className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-4 -ml-0.5">{blogSettings.title || 'Eggspress'}</h1>      
        <div className="font-normal">{blogSettings.tagline || 'Turn your markdown files into a lightning fast blog 🌎'}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='max-w-prose'>
          {postFrontmatter.map(frontmatter => 
            <PostCard key={frontmatter.slug} post={frontmatter}></PostCard>
          )}
        </div>
        <div>
          <IndexSidebar></IndexSidebar>
        </div>
      </div>
    </main>
  )
}
