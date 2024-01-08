'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import useOuterClick from '../hooks/useOuterClick'
import { setTimeout } from 'timers'
import { usePathname } from 'next/navigation'


type DropdownMenuProps = {
  children: ReactNode,
  closeOnRouteChange?: boolean
}

const DropdownMenu = ({children, closeOnRouteChange = true}: DropdownMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const ref: any = useRef()
  const pathname = usePathname()
  
  useOuterClick(ref.current, () => {
    setExpanded(false)
    setTimeout(() => {setMenuVisible(false)}, 150)
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
      setTimeout(() => {setMenuVisible(false)}, 150)
    }
  }

  return (
    <div className="ml-3 relative">
      <div onClick={toggleDropdownMenu}>
          <Image className="text-gray-500" src="/assets/navigation.svg" width={24} height={24} alt="navigation button"></Image>
      </div>
      <div ref={ref} className={`rounded-lg duration-100 absolute right-2 ${expanded ? 'top-12 opacity-100' : 'top-9 opacity-0'}`}>
        {menuVisible && children}
      </div>
    </div>
  )
}

export default DropdownMenu