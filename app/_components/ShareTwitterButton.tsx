'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareTwitterButtonProps = {
  headline?: string,
  subtitle?: string,
  children: ReactNode
}



const ShareTwitterButton = ({headline, subtitle, children}: ShareTwitterButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <a target="_blank" href={`https://twitter.com/intent/tweet?text=Read%20"${encodeURIComponent(`${headline || ""}${subtitle ? ' ' + subtitle : ''}`)}"&url=${encodeURIComponent(url)}`}>
      {children}
    </a>
  )

}

export default ShareTwitterButton