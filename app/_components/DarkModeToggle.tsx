'use client'
import Image from 'next/image'
import useDarkMode from '../hooks/useDarkMode'
import { useEffect, useState } from 'react'

const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const [nextTheme, setTheme] = useDarkMode()

  return (
    <div
      tabIndex={0}
      className={`h-5 overflow-y-hidden -mt-0.5 cursor-pointer ${mounted ? nextTheme : ''}`}
      onClick={() => {
        setTheme(mounted ? nextTheme : 'light')
      }}
      onKeyUp={e => {
        e.preventDefault()
        e.stopPropagation()
        if (e.key === 'Enter') {
          setTheme(mounted ? nextTheme : 'light')
        }
      }}
    >
      <Image
        className={`${mounted ? (nextTheme === 'dark' ? 'mt-0 pb-1' : '-mt-5') : 'mt-0 pb-1'} duration-500 ease-out`}
        src="/assets/moon.svg"
        height="20"
        width="20"
        alt="Toggle dark mode on"
      />
      <Image src="/assets/sun.svg" height="20" width="20" alt="Toggle dark mode off" />
    </div>
  )
}

export default DarkModeToggle
