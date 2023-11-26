import Link from 'next/link'
import React from 'react'

interface EggspressLinkProps {
  href: string;
  children: React.ReactNode
}

// isUrlAbsolute comes from https://stackoverflow.com/a/38979205
const isUrlAbsolute = (url:string): boolean => (url.indexOf('//') === 0 ? true : url.indexOf('://') === -1 ? false : url.indexOf('.') === -1 ? false : url.indexOf('/') === -1 ? false : url.indexOf(':') > url.indexOf('/') ? false : url.indexOf('://') < url.indexOf('.') ? true : false)


const EggspressLink: React.FC<EggspressLinkProps> = ({href, children}: EggspressLinkProps) => {
  return (
    isUrlAbsolute(href) ? <Link href={href} target="_blank">{children}</Link> : <Link href={href}>{children}</Link>
  )
}

export default EggspressLink