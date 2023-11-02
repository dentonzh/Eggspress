import React from 'react'
import Logo from '../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='px-3 md:px-0 flex py-8 min-w-full duration-100 bg-gray-100 dark:bg-gray-700 pb-20 md:pb-64'>
        <div className="flex container dark:text-gray-200">
            <div className="w-1/2 md:w-2/3">
                Contact
            </div>
            <div className="w-1/2 md:w-1/3">
              <Link href='/'>
                <Image src={Logo} alt='logo' height='132' width='132' style={{width: 'auto', height: 'auto'}} className='grayscale opacity-50 dark:brightness-200 ml-auto' />
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer