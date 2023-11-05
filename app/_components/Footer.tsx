import React from 'react'
import Logo from '../../public/logo.png'
import Eggsmark from '../../public/assets/eggsmark.png'
import Image from 'next/image'
import Link from 'next/link'
import { createSlug } from '../utils'
import getPostFrontmatter from './getPostFrontmatter'

const Footer = async () => {
  const frontmatterData = await getPostFrontmatter()
  const categoryNames = new Set(frontmatterData.filter(
    (post) => { if (!post.category) {return false} return true }
  ).map((post) => post.category))
  const arrayOfCategoryNames = Array.from(categoryNames)
  const categoryData = arrayOfCategoryNames.map((name) => {return {name: name, slug: createSlug(name)}})

  return (
    <div className='px-3 md:px-0 py-8 min-w-full duration-100 bg-gray-100 dark:bg-gray-900 pt-12'>
      <div className="container flex justify-between text-gray-800 dark:text-gray-200">
        <div className="flex flex-col w-1/2 md:w-2/3 font-light text-sm leading-6">
          <div>Contact</div>
          {categoryData.map(category => 
            <Link key={category.slug} href={`/${category.slug}`}>{category.name}</Link>
          )}
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