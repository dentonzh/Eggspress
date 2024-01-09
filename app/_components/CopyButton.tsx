'use client'
import { usePathname } from "next/navigation"
import { ReactNode } from "react"

type CopyButtonProps = {
  children: ReactNode
}

const copyToClipboard = (text: string) => {
  const blob = new Blob([text], { type: 'text/plain' })
  const item = new ClipboardItem({ 'text/plain': blob })
  navigator.clipboard.write([item])
}

const CopyButton = ({children}: CopyButtonProps) => {
  const pathname = usePathname()
  const url = window.location.origin + pathname

  return (
    <div onClick={() => {copyToClipboard(url || '')}}>
      {children}
    </div>
  )

}

export default CopyButton