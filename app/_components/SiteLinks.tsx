import React from 'react'
import Link from 'next/link'
import getFrontmatter from './getFrontmatter'
import { createSlug, getEggspressSettings } from '../utils'

const SiteLinks = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryFrontmatter = await getFrontmatter('categories', appearanceSettings.orderCategoriesBy, appearanceSettings.orderCategoriesByReversed)
  const categoryData = categoryFrontmatter.map((category) => {return {title: category.title, slug: createSlug(category.slug)}})

  const pageFrontmatter = await getFrontmatter('pages', appearanceSettings.orderPagesBy, appearanceSettings.orderPagesByReversed)
  const pageData = pageFrontmatter.map((page) => {return {name: page.title, tagline: page.tagline, priority: page.weight, slug: page.slug}})


  return (
    <div className="flex flex-col w-full">
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
  )
}

export default SiteLinks