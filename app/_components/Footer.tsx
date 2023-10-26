import React from 'react'
import Logo from '../../public/logo.svg'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex py-8 min-w-full duration-100 bg-gray-100 dark:bg-gray-700'>
        <div className="flex container dark:text-gray-200">
            <div className="w-1/2 md:w-2/3">
                Contact
            </div>
            <div className="w-1/2 md:w-1/3">
                <Image src={Logo} alt='logo' height='80' width='80' style={{width: 'auto', height: 'auto'}} className='grayscale opacity-50 dark:brightness-200 ml-auto' />
            </div>
        </div>
    </div>
  )
}

export default Footer