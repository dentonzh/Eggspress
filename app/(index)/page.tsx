import getPostFrontmatter from '../_components/getPostFrontmatter'
import { getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'
import Sidebar from '../_components/Sidebar'


const aboutMe = {
  biography: "I'm John Doe, a rugged wilderness guide. I navigate the untamed outdoors, and my survival skills make me a true nature's navigator.",
  company: "Wild Trails Expeditions",
  hobbies: "Hiking, camping",
  social_media_handle: "@WildDoeExplorer"
}

export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.title
    }
  }
}

export default async function Home() {
  const postMetadata = await getPostFrontmatter()
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
          {postMetadata.map(metadata => 
            <PostCard key={metadata.slug} post={metadata}></PostCard>
          )}
        </div>
        <div>
          <Sidebar>
            <div className='grow text-gray-800 dark:text-gray-100 text-sm leading-relaxed'>
              <div className="mb-3">
                <div className="font-medium text-gray-600 dark:text-gray-300">Hello there!</div>
                <div className="font-light text-gray-500 dark:text-gray-400">
                  {aboutMe.biography}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-medium text-gray-600 dark:text-gray-300">Where I work</div>
                <div className="font-light text-gray-500 dark:text-gray-400">
                  {aboutMe.company}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-medium text-gray-600 dark:text-gray-300">My hobbies</div>
                <div className="font-light text-gray-500 dark:text-gray-400">
                  {aboutMe.hobbies}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-medium text-gray-600 dark:text-gray-300">Social Media</div>
                <div className="font-light text-gray-500 dark:text-gray-400">
                  {aboutMe.social_media_handle}
                </div>
              </div>
            </div>
          </Sidebar>
        </div>
      </div>
    </main>
  )
}
