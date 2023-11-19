import React from 'react'
import { getEggspressSettings } from '../utils'

const authorLinks = async () => {
  const links: Record<string, string> = await getEggspressSettings('links')
  
  if (!Object.values(links).filter(link => link.length > 0)) {
    return
  }

  return (
    <div className="flex flex-col w-full md:w-1/2">
      {Object.keys(links).filter(key => key.startsWith('link') && links[key].length ).map(key => {
        let name
        if (key.startsWith('linkToWebsite')) {
          name = links[`nameFor${key.replace('linkTo', '')}`] && links[`nameFor${key.replace('linkTo', '')}`].length ? links[`nameFor${key.replace('linkTo', '')}`] : key.replace('linkTo', '')
        } else {
          name = links[`nameFor${key.replace('link', '')}`] && links[`nameFor${key.replace('link', '')}`].length ? links[`nameFor${key.replace('link', '')}`] : key.replace('link', '')
        }

        return (
          <div className="mb-6 md:mb-3" key={key}>
            <a href={links[key]} target="_blank" rel="nofollow noopener">
              {name}
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default authorLinks