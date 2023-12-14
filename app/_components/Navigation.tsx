import Link from 'next/link'
import React from 'react'
import Logo from '../../public/assets/logo.png'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'
import { getEggspressSettings } from '../utils'
import DropdownMenu from './DropdownMenu'
import SiteLinks from './SiteLinks'
import NavigationMenu from './NavigationMenu'

const Navigation = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')


  return (
    <nav className={`sticky top-0 px-3 md:px-0 duration-200 bg-${appearanceSettings.colorThemeNavLight || 'gray-100'} dark:bg-${appearanceSettings.colorThemeNavDark || 'slate-900'} py-2 z-10`}>
      <div className="flex container justify-between">
        <div>
          <Link href='/'>
            <Image src={Logo} height={32} style={{width: 'auto', height: 'auto'}} alt='Eggspress blog logo' className='dark:hue-rotate-270 dark:brightness-[3]' />
          </Link>
        </div>
        <div className="flex items-center dark:text-white">
            {/* <div className="mr-1">Contact</div> */}
            <DarkModeToggle />
            <DropdownMenu>
              <NavigationMenu>
                <div className="w-48 pl-6 pt-6">
                  <SiteLinks></SiteLinks>
                </div>
              </NavigationMenu>
            </DropdownMenu>
            {/* <div className="mr-1">Website</div>
            <div className="mr-1">Blah</div> */}
        </div>
      </div>
    </nav>
  )
}

export default Navigation