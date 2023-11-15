import React from 'react'
import Logo from '../../public/logo.png'
import Eggsmark from '../../public/assets/eggsmark.png'
import Image from 'next/image'
import Link from 'next/link'
import { createSlug, getEggspressSettings } from '../utils'
import getFrontmatter from './getFrontmatter'
import AuthorLinks from '../_components/AuthorLinks'

const Footer = async () => {
  const postFrontmatter = await getFrontmatter('posts')
  const categoryNames = new Set(postFrontmatter.filter(
    (post) => { if (!post.category) {return false} return true }
  ).map((post) => post.category))
  const arrayOfCategoryNames = Array.from(categoryNames)
  const categoryData = arrayOfCategoryNames.map((name) => {return {name: name, slug: createSlug(name)}})
  const pageFrontmatter = await getFrontmatter('pages')
  const pages = pageFrontmatter.map((page) => {return {name: page.title, tagline: page.tagline, priority: page.weight, slug: page.slug}})
  const pageData = pages.sort((a, b) => {
    return (a.priority || 0) < (b.priority || 0) ? -1 : 1
  })
  const blogSettings = await getEggspressSettings('metadata')
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={`px-3 md:px-0 py-8 min-w-full duration-100 bg-${appearanceSettings.colorLightFooter || appearanceSettings.colorLightPrimary} dark:bg-${appearanceSettings.colorDarkFooter || appearanceSettings.colorDarkPrimary} pt-12`}>
      <div className="container flex justify-between text-gray-800 dark:text-gray-200">
        <div className="flex flex-col w-1/2 sm:w-2/3 font-light text-sm leading-6">
          <div className="flex flex-col w-full sm:w-1/2 mb-3">
            {categoryData.map(category => 
              <Link key={category.slug} href={`/${category.slug}`}>{category.name}</Link>
            )}
          </div>
          <div className="flex flex-col w-full sm:w-1/2 mb-3">
            {pageData.map(page => 
              <Link key={page.slug} href={`/page/${page.slug}`}>{page.name}</Link>
            )}
          </div>
          <AuthorLinks />
        </div>
        <div className="w-1/2 md:w-1/3">
          <Link href='/'>
            <Image src={Logo} alt='logo' className='grayscale opacity-50 dark:brightness-[3] ml-auto' />
          </Link>
        </div>
      </div>
      <div className="flex w-full text-center h-48">
        <div className="mx-auto mt-auto inline-block text-xs text-gray-500 select-none font-normal hover:font-bold duration-150 delay-100">
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