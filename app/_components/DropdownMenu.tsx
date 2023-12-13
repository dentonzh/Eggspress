'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Navigation from '../../public/assets/navigation.svg'
import Image from 'next/image'
import useOuterClick from '../hooks/useOuterClick'
import { setTimeout } from 'timers'


type DropdownMenuProps = {
  children: ReactNode
}

const DropdownMenu = ({children}: DropdownMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const ref: any = useRef()
  
  useOuterClick(ref.current, () => {
    setExpanded(false)
  })

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
          <Image className="text-gray-500" src={Navigation} alt="navigation button"></Image>
      </div>
      <div ref={ref} className={`rounded-lg duration-100 absolute right-2 ${expanded ? 'top-12 opacity-100' : 'top-9 opacity-0'}`}>
        {menuVisible && children}
      </div>
    </div>
  )
}

export default DropdownMenu