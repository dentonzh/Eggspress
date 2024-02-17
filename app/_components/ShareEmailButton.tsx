'use client'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type ShareEmailButtonProps = {
  className?: string
  headline?: string
  subtitle?: string
  siteName?: string
  children: ReactNode
}

const ShareEmailButton = ({ className, headline, subtitle, siteName, children }: ShareEmailButtonProps) => {
  const pathname = usePathname()
  const queryParameters = 'utm_source=email&utm_medium=share&utm_campaign=article-share-button'
  const url = window.location.origin + pathname + queryParameters
  const subject = encodeURIComponent(`${headline || ''}${subtitle ? ' ' + subtitle : ''}`)
  const body = encodeURIComponent(`${url}\n\n\n\nTry Eggspress (@EggspressBlog), the fast and free blogging platform`)

  return (
    <a className={className} target="_top" href={`mailto:?subject=${subject}&body=${body}`}>
      {children}
    </a>
  )
}

export default ShareEmailButton
