'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useOuterClick from '../hooks/useOuterClick'
import { setTimeout } from 'timers'
import { usePathname } from 'next/navigation'

type DropdownMenuProps = {
  children: ReactNode
  icon?: string
  text?: string
  align?: string
  altText?: string
  closeOnRouteChange?: boolean
}

const DropdownMenu = ({ children, icon, text, align, altText, closeOnRouteChange = true }: DropdownMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const ref: any = useRef()
  const pathname = usePathname()

  useOuterClick(ref.current, () => {
    setExpanded(false)
    setTimeout(() => {
      setMenuVisible(false)
    }, 150)
  })

  useEffect(() => {
    if (closeOnRouteChange) {
      let currentPathname = ''

      if (pathname !== currentPathname) {
        setExpanded(false)
        setMenuVisible(false)
      }
    }
  }, [closeOnRouteChange, pathname])

  const toggleDropdownMenu = () => {
    if (!expanded) {
      setExpanded(true)
      setMenuVisible(true)
    } else {
      setExpanded(false)
      setTimeout(() => {
        setMenuVisible(false)
      }, 150)
    }
  }

  return (
    <div className="relative w-full">
      <div onClick={toggleDropdownMenu}>
        {icon && (
          <Image
            className="text-gray-500"
            src={`/assets/${icon}`}
            width={24}
            height={24}
            alt={altText ? altText : 'dropdown menu button'}
          ></Image>
        )}
        {text && <span className="select-none cursor-pointer">{text}</span>}
      </div>
      <div
        ref={ref}
        className={`rounded-lg duration-100 absolute ${align} ${expanded ? 'top-12 opacity-100' : 'top-9 opacity-0'}`}
      >
        {menuVisible && children}
      </div>
    </div>
  )
}

export default DropdownMenu
