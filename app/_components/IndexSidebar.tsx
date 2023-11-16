import React from 'react'
import Sidebar from './Sidebar'

const IndexSidebar = async () => {
  
  const aboutMe = {
    biography: "I'm John Doe, a rugged wilderness guide. I navigate the untamed outdoors, and my survival skills make me a true nature's navigator.",
    company: "Wild Trails Expeditions",
    hobbies: "Hiking, camping",
    social_media_handle: "@WildDoeExplorer"
  }
  return (
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
  )
}

export default IndexSidebar