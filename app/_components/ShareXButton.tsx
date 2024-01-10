'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareXButtonProps = {
  className?: string,
  headline?: string,
  subtitle?: string,
  siteName?: string,
  children: ReactNode
}


const ShareXButton = ({className, headline, subtitle, siteName, children}: ShareXButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <a className={className} target="_blank" href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Read "${headline || ""}${subtitle ? ' ' + subtitle : ''}"${siteName ? ` on ${siteName}: ` : ': '}`)}&url=${encodeURIComponent(url)}&hashtags=${siteName ? `${siteName},Eggspress` : 'Eggspress'}&via=EggspressBlog&related=EggspressBlog,dentonzh`}>
      {children}
    </a>
  )

}

export default ShareXButton