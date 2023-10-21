'use client'
import Image from 'next/image'
import Sun from '../../public/sun.svg'
import Moon from '../../public/moon.svg'
import useDarkMode from '../hooks/useDarkMode'


const DarkModeToggle = () => {
  const [nextTheme, setTheme] = useDarkMode()

  return (
    <div className={`h-5 overflow-y-hidden -mt-0.5 ${nextTheme}`} onClick={() => {setTheme(nextTheme)}}>
        <Image className={`${nextTheme === 'dark' ? 'mt-0 pb-1' : '-mt-5'} duration-200`} src={Moon} alt='Toggle dark mode on' />
        <Image src={Sun} alt='Toggle dark mode off' />
    </div>
  )
}

export default DarkModeToggle