'use client'
import Image from 'next/image'
import Sun from '../../public/sun.svg'
import Moon from '../../public/moon.svg'
import useDarkMode from '../hooks/useDarkMode'
import { useEffect, useState } from 'react'


const DarkModeToggle = () => {

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const [nextTheme, setTheme] = useDarkMode()
  
  return (
    <div className={`h-5 overflow-y-hidden -mt-0.5 ${mounted ? nextTheme : ''}`} onClick={() => {setTheme(mounted ? nextTheme : 'light')}}>
        <Image className={`${mounted ? (nextTheme === 'dark' ? 'mt-0 pb-1' : '-mt-5') : 'mt-0 pb-1'} duration-200`} src={Moon} alt='Toggle dark mode on' />
        <Image src={Sun} alt='Toggle dark mode off' />
    </div>
  )
}

export default DarkModeToggle