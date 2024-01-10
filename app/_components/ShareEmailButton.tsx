'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareTwitterButtonProps = {
  className?: string,
  headline?: string,
  subtitle?: string,
  siteName?: string,
  children: ReactNode
}



const ShareTwitterButton = ({className, headline, subtitle, siteName, children}: ShareTwitterButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname
  const subject = encodeURIComponent(`Read "${headline || ""}${subtitle ? ' ' + subtitle : ''}"`)
  const body = encodeURIComponent(`Read <a href="${url}">${headline || ""}${subtitle ? ' ' + subtitle : ''}</a>${siteName ? ` on ${siteName}. ` : '.'}\n\n\n\nSent from <a href="https://eggspress.vercel.app">Eggspress</a>, the fast and free blogging platform.`)

  return (

    <a className={className} target="_top" href={`mailto:?subject=${subject}&body=${body}`}>
      {children}
    </a>
  )

}

export default ShareTwitterButton