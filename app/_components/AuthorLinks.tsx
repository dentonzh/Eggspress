import React from 'react'
import { getEggspressSettings } from '../utils'
import { link } from 'fs'
import Link from 'next/link'

const authorLinks = async () => {
  const links: Record<string, string> = await getEggspressSettings('links')
  
  if (!Object.values(links).filter(link => link.length > 0)) {
    return
  }

  return (
    <div className="flex flex-col w-full sm:w-1/2 mt-3">
      <div className="font-medium">Links</div>
      {Object.keys(links).filter(key => key.startsWith('link') && links[key].length ).map(key => {
        const name = links[`nameFor${key.replace('link', '')}`] && links[`nameFor${key.replace('link', '')}`].length ? links[`nameFor${key.replace('link', '')}`] : key.replace('link', '')

        return (
          <div key={key}>
            <Link href={links[key]}>
              {name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default authorLinks