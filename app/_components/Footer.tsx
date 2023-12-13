import React from 'react'
import Logo from '../../public/assets/logo.png'
import Eggsmark from '../../public/assets/eggsmark.png'
import Image from 'next/image'
import Link from 'next/link'
import { createSlug, getEggspressSettings } from '../utils'
import getFrontmatter from './getFrontmatter'
import AuthorLinks from '../_components/AuthorLinks'
import SiteLinks from './SiteLinks'

const Footer = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')
  return (
    <div className={`px-3 md:px-0 py-8 mt-6 min-w-full duration-100 bg-${appearanceSettings.colorThemeFooterLight || appearanceSettings.colorThemeHeroLight || 'gray-100'} dark:bg-${appearanceSettings.colorThemeFooterDark || appearanceSettings.colorThemeHeroDark || 'slate-900'} pt-12`}>
      <div className={`container flex justify-between ${appearanceSettings.colorFooterLinkTextDark ? `dark:text-${appearanceSettings.colorFooterLinkTextDark}` : 'dark:text-gray-200' } ${appearanceSettings.colorFooterLinkTextLight ? `text-${appearanceSettings.colorFooterLinkTextLight}` : 'text-gray-800'}`}>
        <div className="flex flex-wrap w-full md:w-2/3 font-light md:text-sm leading-6">
          <div className="w-1/2">
            <SiteLinks></SiteLinks>
          </div>
          <div className="w-1/2">
            <AuthorLinks />
          </div>
        </div>
        <div className="md:w-1/3">
          <Link href='/'>
            <Image src={Logo} alt='logo' className='grayscale opacity-50 dark:brightness-[3] ml-auto max-h-18 w-auto' />
          </Link>
        </div>
      </div>
      <div className="flex w-full text-center h-48">
        <div className="mx-auto mt-auto inline-block text-xs text-gray-600 dark:text-gray-400 select-none font-normal hover:font-bold duration-150">
          <Link href="https://github.com/dentonzh/Eggspress">
            <span>
              Made with 
            </span>
            <Image className="inline-block mx-1 dark:brightness-[3]" src={Eggsmark} alt='Eggspress brand icon'></Image>
            <span>
              Eggspress
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer