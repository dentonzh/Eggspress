import Link from 'next/link'
import React from 'react'
import getSlugs from './getSlugs'
import { buildLink, isUrlAbsolute, setAnchorTargetProperty } from '../utils'

interface EggspressLinkProps {
  href: string
  id?: string
  children: React.ReactNode
}

type prefixMap = Record<string, string>

const internalUrlPrefixMap: prefixMap = {
  my_posts: '/blog/',
  my_pages: '/',
  my_categories: '/',
  my_authors: '/author/',
  posts: '/blog/',
  pages: '/',
  categories: '/',
  authors: '/author/',
}

// isUrlAbsolute comes from https://stackoverflow.com/a/38979205

// Process internal urls
const processInternalUrl = async (url: string): Promise<string> => {
  if (url.charAt(0) === '/') {
    url = url.slice(1)
  }

  const contentType: string = url.slice(0, url.indexOf('/'))
  const slug = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.') > 0 ? url.lastIndexOf('.') : url.length)

  if (url.startsWith('my_') && url.indexOf('/') > -1) {
    // if url is absolute path from workspace folder root
    if (url.endsWith('.md') || url.endsWith('.mdx') || contentType) {
      const prefix = internalUrlPrefixMap[contentType]
      return `${prefix}${slug}`
    }
  } else {
    // perform recursive search on filename or slug as fallback
    const contentTypesToSearch = ['posts', 'pages', 'authors']
    let files = []
    for (let i = 0; i < contentTypesToSearch.length; i++) {
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
  return await buildLink(url)
}

const EggspressLink: React.FC<EggspressLinkProps> = async ({ href, id, children }: EggspressLinkProps) => {
  return isUrlAbsolute(href) ? (
    <Link href={await processExternalUrl(href)} id={id} target={setAnchorTargetProperty(href)}>
      {children}
    </Link>
  ) : (
    <Link id={id} href={await processInternalUrl(href)}>
      {children}
    </Link>
  )
}

export default EggspressLink
