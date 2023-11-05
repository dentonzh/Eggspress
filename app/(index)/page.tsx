import getPostFrontmatter from '../_components/getPostFrontmatter'
import PostCard from '../_components/PostCard'
import Sidebar from '../_components/Sidebar'


const aboutMe = {
  biography: "I'm John Doe, a rugged wilderness guide. I navigate the untamed outdoors, and my survival skills make me a true nature's navigator.",
  company: "Wild Trails Expeditions",
  hobbies: "Hiking, camping",
  social_media_handle: "@WildDoeExplorer"
}

export default async function Home() {
  const postMetadata = await getPostFrontmatter()
  return (
    <main className="flex flex-wrap">
      <div className="w-full mb-12 pt-32 pb-12 duration-500 text-gray-800 dark:text-gray-100 bleed-bg bleed-slate-100 dark:bleed-gray-900">
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">Eggspress</h1>      
        <div>Turn your markdown files into an insanely fast blog 🌎</div>
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
                <div className="font-bold text-gray-600 dark:text-gray-300">Hello there!</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.biography}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-300">Where I work</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.company}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-300">My hobbies</div>
                <div className="font-semibold text-gray-500">
                  {aboutMe.hobbies}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-bold text-gray-600 dark:text-gray-300">Social Media</div>
                <div className="font-semibold text-gray-500">
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
