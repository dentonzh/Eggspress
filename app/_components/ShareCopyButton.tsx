'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type ShareCopyButtonProps = {
  children: ReactNode
}

const copyToClipboard = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const item = new ClipboardItem({ 'text/plain': blob })
  navigator.clipboard.write([item])
}

const ShareCopyButton = ({children}: ShareCopyButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <div onClick={() => {copyToClipboard(url || '')}}>
      {children}
    </div>
  )

}

export default ShareCopyButton