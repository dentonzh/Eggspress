import Link from 'next/link'
import React from 'react'
import Logo from '../../public/assets/logo.png'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'
import { getColors, getEggspressSettings } from '../utils'
import DropdownMenu from './DropdownMenu'
import SiteLinks from './SiteLinks'
import NavigationMenu from './NavigationMenu'

const Navigation = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <nav className={`sticky top-0 px-3 md:px-0 duration-200 ${await getColors('bg', 'ThemeNav', 'slate-900', 'gray-100')} py-2 z-10`}>
      <div className="flex container justify-between">
        <div className="flex">
          <Link className="flex items-center" href='/'>
            {appearanceSettings.showBrandLogo && 
              <Image src={Logo} height={32} style={{width: 'auto', height: 'auto'}} alt='Eggspress blog logo' className='dark:hue-rotate-270 dark:brightness-[3] mr-2' />
            }
            {appearanceSettings.showBrandText &&
              <span className={`flex font-bold ${await getColors('text', 'NavBarBrandText', 'gray-200', 'gray-800')}`}>{appearanceSettings.brandText}</span>
            }
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