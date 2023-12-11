'use client'
import { ReactNode, useEffect, useRef, useState } from 'react'
import Navigation from '../../public/assets/navigation.svg'
import Image from 'next/image'
import useOuterClick from '../hooks/useOuterClick'


type DropdownMenuProps = {
  children: ReactNode
}

const DropdownMenu = ({children}: DropdownMenuProps) => {
  const [expanded, setExpanded] = useState(false)
  const ref: any = useRef()
  
  useOuterClick(ref.current, () => {
    setExpanded(false)
  })

  return (
    <div className="ml-3 relative">
      <div onClick={() => {setExpanded(!expanded)}}>
          <Image className="text-gray-500" src={Navigation} alt="navigation button"></Image>
      </div>
      <div ref={ref} className={`duration-100 absolute right-2 bg-gray-500 ${expanded ? 'top-12 opacity-100' : 'top-9 opacity-0'}`}>
        <div className="bg-white dark:bg-slate-700 relative -top-0.5 -right-0.5 -left-0.5 -bottom-0.5 border border-gray-500">
          {children}
        </div>
      </div>
    </div>
  )
}

export default DropdownMenu