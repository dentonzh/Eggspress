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
  const ref = useRef(undefined)
  const pathname = usePathname()

  useOuterClick(ref.current, () => {
    setExpanded(false)
    setTimeout(() => {
      setMenuVisible(false)
    }, 150)
  })

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExpanded(false)
      }
    }

    window.addEventListener('keyup', handleEsc)

    if (closeOnRouteChange) {
      let currentPathname = ''

      if (pathname !== currentPathname) {
        setExpanded(false)
        setMenuVisible(false)
      }
    }

    return () => {
      window.removeEventListener('keyup', handleEsc)
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
      <div
        tabIndex={0}
        onClick={toggleDropdownMenu}
        onKeyUp={e => {
          e.preventDefault()
          e.stopPropagation()
          if (e.key === 'Enter') {
            toggleDropdownMenu()
          } else if (e.key === 'Escape') {
            setExpanded(false)
          }
        }}
      >
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
        className={`rounded-lg duration-100 absolute ${align} ${expanded ? 'top-12 opacity-100' : 'top-9 opacity-0'}`}
      >
        {menuVisible && children}
      </div>
    </div>
  )
}

export default DropdownMenu
