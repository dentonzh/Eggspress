'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareSocialButtonProps = {
  baseUrl: string,
  skipEncode?: boolean,
  urlSuffix?: string,
  children: ReactNode
}



const ShareSocialButton = ({baseUrl, skipEncode, urlSuffix, children}: ShareSocialButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <a target="_blank" href={`${baseUrl}${skipEncode ? url : encodeURIComponent(url)}${urlSuffix}`}>
      {children}
    </a>
  )

}

export default ShareSocialButton