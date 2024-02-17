import React from 'react'
import { buildLink, getEggspressSettings, isUrlAbsolute, setAnchorTargetProperty } from '../utils'

const authorLinks = async () => {
  const links: Record<string, string> = await getEggspressSettings('links')

  // Rebuild object for links and call it modified links to avoid hydration error
  const filteredLinks = Object.keys(links).filter(key => key.startsWith('link') && links[key].length)
  const modifiedLinks = Object.fromEntries(
    await Promise.all(filteredLinks.map(async key => [key, await buildLink(links[key])]))
  )

  if (!Object.values(links).filter(link => link.length > 0)) {
    return
  }

  return (
    <div className="flex flex-col w-full md:w-1/2">
      {Object.keys(links)
        .filter(key => key.startsWith('link') && links[key].length)
        .map(key => {
          let name
          if (key.startsWith('linkToWebsite')) {
            name =
              links[`nameFor${key.replace('linkTo', '')}`] && links[`nameFor${key.replace('linkTo', '')}`].length
                ? links[`nameFor${key.replace('linkTo', '')}`]
                : key.replace('linkTo', '')
          } else {
            name =
              links[`nameFor${key.replace('link', '')}`] && links[`nameFor${key.replace('link', '')}`].length
                ? links[`nameFor${key.replace('link', '')}`]
                : key.replace('link', '')
          }

          return (
            <div className="mb-6 md:mb-3" key={key}>
              <a
                className="underline-animated"
                href={modifiedLinks[key]}
                target={setAnchorTargetProperty(modifiedLinks[key])}
                rel="nofollow noopener"
              >
                {name}
              </a>
            </div>
          )
        })}
    </div>
  )
}

export default authorLinks
