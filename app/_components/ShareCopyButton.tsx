'use client'
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"

type ShareCopyButtonProps = {
  className: string,
  showCopyStatus?: boolean,
  children: ReactNode
}


const copyToClipboard = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const item = new ClipboardItem({ 'text/plain': blob })
  navigator.clipboard.write([item])
}

const ShareCopyButton = ({className, showCopyStatus=true, children}: ShareCopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <div className={`cursor-pointer ${className}`} onClick={() => {copyToClipboard(url || ''); setCopied(true); setTimeout(() => {setCopied(false)}, 750)}}>
      {children}
      {showCopyStatus &&
        <span className={`pl-1 duration-100 text-xs font-light ${copied ? 'opacity-100' : 'opacity-0'}`}>
          Copied!
        </span>
      }
    </div>
  )

}

export default ShareCopyButton