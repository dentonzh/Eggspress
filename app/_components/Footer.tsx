import React from 'react'
import Logo from '../../public/assets/logo.png'
import Eggsmark from '../../public/assets/eggsmark.png'
import Image from 'next/image'
import Link from 'next/link'
import { createSlug, getEggspressSettings } from '../utils'
import getFrontmatter from './getFrontmatter'
import AuthorLinks from '../_components/AuthorLinks'

const Footer = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryFrontmatter = await getFrontmatter('categories', appearanceSettings.orderCategoriesBy, appearanceSettings.orderCategoriesByReversed)
  const categoryData = categoryFrontmatter.map((category) => {return {title: category.title, slug: createSlug(category.slug)}})

  const pageFrontmatter = await getFrontmatter('pages', appearanceSettings.orderPagesBy, appearanceSettings.orderPagesByReversed)
  const pageData = pageFrontmatter.map((page) => {return {name: page.title, tagline: page.tagline, priority: page.weight, slug: page.slug}})

  return (
    <div className={`px-3 md:px-0 py-8 min-w-full duration-100 bg-${appearanceSettings.colorThemeLightFooter || appearanceSettings.colorThemeLightPrimary || 'gray-100'} dark:bg-${appearanceSettings.colorThemeDarkFooter || appearanceSettings.colorThemeDarkPrimary || 'slate-900'} pt-12`}>
      <div className="container flex justify-between text-gray-800 dark:text-gray-200">
        <div className="flex flex-wrap w-full md:w-2/3 font-light md:text-sm leading-6">
          <div className="w-1/2">
            <div className="flex flex-col w-full sm:w-1/2">
              {categoryData.map(category => 
                <Link className="mb-6 md:mb-3" key={category.slug} href={`/${category.slug}`}>{category.title}</Link>
              )}
            </div>
            {categoryData.length > 0 && pageData.length > 0 &&
              <div className="w-2/3 mb-6 md:mb-3">
                <div className="border-b border-dotted border-gray-400 dark:border-gray-600"></div>
              </div>
            }
            <div className={`flex flex-col w-full sm:w-1/2 mb-3`}>
              {pageData.map(page => 
                <Link className="mb-6 md:mb-3" key={page.slug} href={`/page/${page.slug}`}>{page.name}</Link>
              )}
            </div>
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