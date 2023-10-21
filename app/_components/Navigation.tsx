import Link from 'next/link'
import React from 'react'
import Logo from '../../public/logo.svg'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'

const Navigation = () => {
  const dark = ''
  return (
    <nav className="mb-6 duration-100 bg-gray-50 dark:bg-gray-900 py-2">
      <div className="flex container">
        <div>
          <Link href='/'><Image src={Logo} alt='logo' height='42' width='42' className='dark:hue-rotate-270 dark:brightness-200' /></Link>
        </div>
        <div className="flex ml-auto items-center dark:text-white">
            {/* <div className="mr-1">Contact</div> */}
            <DarkModeToggle />
            {/* <div className="mr-1">Website</div>
            <div className="mr-1">Blah</div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navigation