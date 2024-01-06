import Link from 'next/link'
import React from 'react'
import getSlugs from './getSlugs'
import { getEggspressSettings } from '../utils';

interface EggspressLinkProps {
  href: string;
  id?: string;
  children: React.ReactNode
}

type prefixMap = Record<string, string>

const internalUrlPrefixMap: prefixMap = {
  'my_posts': '/blog/',
  'my_pages': '/',
  'my_categories': '/',
  'my_authors': '/author/',
  'posts': '/blog/',
  'pages': '/',
  'categories': '/',
  'authors': '/author/'
}

// isUrlAbsolute comes from https://stackoverflow.com/a/38979205
const isUrlAbsolute = (url:string): boolean => (url.indexOf('//') === 0 ? true : url.indexOf('://') === -1 ? false : url.indexOf('.') === -1 ? false : url.indexOf('/') === -1 ? false : url.indexOf(':') > url.indexOf('/') ? false : url.indexOf('://') < url.indexOf('.') ? true : false)

// Process internal urls
const processInternalUrl = async (url: string): Promise<string> => {
  if (url.charAt(0) === '/') {
    url = url.slice(1)
  }

  const contentType: string = url.slice(0, url.indexOf('/'))
  const slug = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.') > 0 ? url.lastIndexOf('.') : url.length)
  
  if (url.startsWith('my_') && url.indexOf('/') > -1) { // if url is absolute path from workspace folder root
    if (url.endsWith('.md') || url.endsWith('.mdx') || contentType) {
      const prefix = internalUrlPrefixMap[contentType]
      return `${prefix}${slug}`
    }
  } else { // perform recursive search on filename or slug as fallback
    const contentTypesToSearch = ['posts', 'pages', 'authors']
    let files = []
    for ( let i = 0; i < contentTypesToSearch.length; i ++ ) {
      files = await getSlugs(contentTypesToSearch[i])
      const file = files.filter(file => file.slug === slug)
      if (file.length) {
        return `${internalUrlPrefixMap['my_' + contentTypesToSearch[i]]}${slug}`
      }
    }
  }

  return url
}

const processExternalUrl = async (url: string): Promise<string> => {
  const linkSettings = await getEggspressSettings('links')
  const re = /:\/\/([^\/]*)/;
  const match = url.match(re)

  if ( match && match[1] ) {
    const baseUrl = match[1]
    for ( let i = 1; i <= 20; i++ ) {
      if ( linkSettings[`modifyLinkBaseUrl${i}`] === baseUrl ) {
        let newUrl = 'https://'
        if (linkSettings[`modifyLinkSetPrefix${i}`]) {
          newUrl += linkSettings[`modifyLinkSetPrefix${i}`]
        }
        if (linkSettings[`modifyLinkSetNewBaseUrl${i}`]) {
          newUrl += linkSettings[`modifyLinkSetNewBaseUrl${i}`]
        } else {
          newUrl += baseUrl
        }
        if (linkSettings[`modifyLinkSetSuffix${i}`]) {
          newUrl += linkSettings[`modifyLinkSetSuffix${i}`]
        }
        return newUrl
      }
    }
  }

  return url
}

const EggspressLink: React.FC<EggspressLinkProps> = async ({href, id, children}: EggspressLinkProps) => {
  return (
    isUrlAbsolute(href) ?
      <Link href={await processExternalUrl(href)} id={id} target="_blank">{children}</Link> 
      : 
      <Link id={id} href={await processInternalUrl(href)}>{children}</Link>
  )
}

export default EggspressLink