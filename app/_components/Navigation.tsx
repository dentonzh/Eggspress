import Link from 'next/link'
import React from 'react'
import Logo from '../../public/logo.png'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'

const Navigation = () => {
  const dark = ''
  return (
    <nav className="sticky top-0 px-3 md:px-0 duration-100 bg-slate-100 dark:bg-gray-900 py-2 z-10">
      <div className="flex container justify-between">
        <div>
          <Link href='/'>
            <Image src={Logo} height={32} width={32} alt='Eggspress blog logo' className='dark:hue-rotate-270 dark:brightness-[3]' />
          </Link>
        </div>
        <div className="flex items-center dark:text-white">
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