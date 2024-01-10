'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareSocialButtonProps = {
  className?: string,
  baseUrl: string,
  skipEncode?: boolean,
  urlSuffix?: string,
  children: ReactNode
}



const ShareSocialButton = ({className, baseUrl, skipEncode, urlSuffix, children}: ShareSocialButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <a className={className} target="_blank" href={`${baseUrl}${skipEncode ? url : encodeURIComponent(url)}${urlSuffix}`}>
      {children}
    </a>
  )

}

export default ShareSocialButton