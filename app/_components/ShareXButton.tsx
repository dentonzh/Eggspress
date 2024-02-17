'use client'
import { usePathname } from 'next/navigation'
import { ReactNode, useState } from 'react'

type ShareXButtonProps = {
  className?: string
  headline?: string
  subtitle?: string
  siteName?: string
  children: ReactNode
}

const ShareXButton = ({ className, headline, subtitle, siteName, children }: ShareXButtonProps) => {
  const [clicked, setClicked] = useState(false)

  const pathname = usePathname()
  const url = window.location.origin + pathname
  const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Read "${headline || ''}${subtitle ? ' ' + subtitle : ''}"${siteName ? ` on ${siteName}: ` : ': '}`)}&url=${encodeURIComponent(url)}&hashtags=${siteName ? `${siteName},Eggspress` : 'Eggspress'}&via=EggspressBlog&related=EggspressBlog,dentonzh`

  return (
    <a
      className={className}
      target="_blank"
      onClick={() => {
        if (!clicked) {
          window.open(
            href,
            'targetWindow',
            'toolbar=no,location=0,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=280'
          )
          setClicked(true)
          setTimeout(() => {
            setClicked(false)
          }, 500)
        }
      }}
      href={href}
    >
      {children}
    </a>
  )
}

export default ShareXButton
