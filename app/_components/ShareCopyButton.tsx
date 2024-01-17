'use client'
import { usePathname } from "next/navigation"
import { ReactNode, useState } from "react"
import { getString } from "../utils"

type ShareCopyButtonProps = {
  className: string,
  copyStatus?: string,
  children: ReactNode
}


const copyToClipboard = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const item = new ClipboardItem({ 'text/plain': blob })
  navigator.clipboard.write([item])
}

const ShareCopyButton = ({className, copyStatus='', children}: ShareCopyButtonProps) => {
  const [copied, setCopied] = useState(false)
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <div className={`cursor-pointer ${className}`} onClick={() => {copyToClipboard(url || ''); setCopied(true); setTimeout(() => {setCopied(false)}, 1000)}}>
      {children}
      {copyStatus &&
        <span className={`px-3 -ml-16 bg-gray-50/90 dark:bg-gray-900/80 rounded duration-100 ${copied ? 'opacity-100' : 'opacity-0'}`}>
          {copyStatus}
        </span>
      }
    </div>
  )

}

export default ShareCopyButton