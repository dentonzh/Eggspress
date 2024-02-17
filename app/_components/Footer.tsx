import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getColors, getEggspressSettings } from '../utils'
import AuthorLinks from '../_components/AuthorLinks'
import FooterLinks from './FooterLinks'

const Footer = async () => {
  return (
    <div
      className={`px-3 md:px-0 py-8 mt-6 min-w-full duration-100 ${await getColors('bg', 'ThemeFooter', 'slate-900', 'gray-100')}`}
    >
      <div
        className={`container flex justify-between ${await getColors('text', 'FooterLinkText', 'gray-200', 'gray-800')}`}
      >
        <div className="flex flex-wrap w-full md:w-2/3 font-light md:text-sm leading-6">
          <div className="w-1/2">
            <FooterLinks />
          </div>
          <div className="w-1/2">
            <AuthorLinks />
          </div>
        </div>
        <div className="md:w-1/3">
          <Link href="/">
            <Image
              src="/assets/logo.png"
              height={64}
              width={64}
              alt="logo"
              className="grayscale opacity-50 dark:brightness-[3] ml-auto max-h-18 w-auto"
            />
          </Link>
        </div>
      </div>
      <div className="flex w-full text-center h-48">
        <div className="mx-auto mt-auto inline-block text-xs text-gray-600 dark:text-gray-400 select-none font-normal hover:font-bold duration-150">
          <Link href="https://github.com/dentonzh/Eggspress">
            <span>Made with</span>
            <Image
              className="inline-block mx-1 dark:brightness-[3]"
              src="/assets/eggsmark.png"
              height={18}
              width={20}
              alt="Eggspress brand icon"
            ></Image>
            <span>Eggspress</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Footer
