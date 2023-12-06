import Link from 'next/link'
import React from 'react'

interface EggspressLinkProps {
  href: string;
  children: React.ReactNode
}

type prefixMap = Record<string, string>

const internalUrlPrefixMap: prefixMap = {
  'my_posts': '/blog/',
  'my_pages': '/',
  'my_categories': '/',
  'my_authors': '/author/'
}

// isUrlAbsolute comes from https://stackoverflow.com/a/38979205
const isUrlAbsolute = (url:string): boolean => (url.indexOf('//') === 0 ? true : url.indexOf('://') === -1 ? false : url.indexOf('.') === -1 ? false : url.indexOf('/') === -1 ? false : url.indexOf(':') > url.indexOf('/') ? false : url.indexOf('://') < url.indexOf('.') ? true : false)

// Process internal urls
const processInternalUrl = (url: string): string => {
  const contentType: string = url.slice(0, url.indexOf('/'))
  if (url.endsWith('.md') || url.endsWith('.mdx') || contentType) {
    const prefix = internalUrlPrefixMap[contentType]
    const slug = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.') > 0 ? url.lastIndexOf('.') : url.length)
    return `${prefix}${slug}`
  }
  return url
}

const EggspressLink: React.FC<EggspressLinkProps> = ({href, children}: EggspressLinkProps) => {
  return (
    isUrlAbsolute(href) ? <Link href={href} target="_blank">{children}</Link> : <Link href={processInternalUrl(href)}>{children}</Link>
  )
}

export default EggspressLink