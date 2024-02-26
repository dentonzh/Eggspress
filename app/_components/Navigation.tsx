import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import DarkModeToggle from './DarkModeToggle'
import { getColors, getEggspressSettings } from '../utils'
import DropdownMenu from './DropdownMenu'
import NavigationMenu from './NavigationMenu'
import NavigationLinks from './NavigationLinks'

const Navigation = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <nav
      className={`sticky top-0 px-3 md:px-0 duration-200 ${await getColors('bg', 'ThemeNav', 'slate-900', 'gray-100')} py-2 z-10`}
    >
      <div className="flex container justify-between">
        <div className="flex">
          <Link className="flex items-center" href="/">
            {(appearanceSettings.showBrandLogo === undefined || appearanceSettings.showBrandLogo) && (
              <Image
                src="/assets/logo.png"
                height={20}
                width={20}
                style={{ width: 'auto', height: 'auto' }}
                alt="Eggspress blog logo"
                className="dark:hue-rotate-270 dark:brightness-[3] mr-2"
              />
            )}
            {appearanceSettings.showBrandText && (
              <span className={`flex font-bold ${await getColors('text', 'NavBarBrandText', 'gray-200', 'gray-800')}`}>
                {appearanceSettings.brandText}
              </span>
            )}
          </Link>
        </div>
        <div className="flex items-center dark:text-white">
          <DarkModeToggle />
          <div className="ml-4 sm:ml-3 cursor-pointer">
            <DropdownMenu icon="navigation.svg" altText="navigation menu toggle button" align="right-2">
              <NavigationMenu>
                <div className="w-48 px-3 pt-6">
                  <NavigationLinks />
                </div>
              </NavigationMenu>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
