'use client'
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"

type ShareSocialButtonProps = {
  className?: string,
  baseUrl: string,
  skipEncode?: boolean,
  urlSuffix?: string,
  children: ReactNode
}

const ShareSocialButton = ({className, baseUrl, skipEncode, urlSuffix, children}: ShareSocialButtonProps) => {
  const [clicked, setClicked] = useState(false)

  const pathname = usePathname()
  const url = window.location.origin + pathname
  const href =`${baseUrl}${skipEncode ? url : encodeURIComponent(url)}${urlSuffix || ''}`

  return (
    <a 
      className={className} 
      target="_blank" 
      onClick={() => {if (!clicked) {window.open(href,'targetWindow','toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=500'); setClicked(true); setTimeout(() => {setClicked(false)}, 500)};}}
      href={href}
    >
      {children}
    </a>
  )

}

export default ShareSocialButton