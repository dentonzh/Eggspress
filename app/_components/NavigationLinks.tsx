import React from 'react'
import Link from 'next/link'
import getFrontmatter from './getFrontmatter'
import { createSlug, getEggspressSettings, getString } from '../utils'

const NavigationLinks = async () => {
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryFrontmatter = await getFrontmatter(
    'categories',
    appearanceSettings.orderCategoriesBy,
    appearanceSettings.orderCategoriesByReversed
  )
  const categoryData = categoryFrontmatter.map(category => {
    return { title: category.title, slug: createSlug(category.slug) }
  })

  const pageFrontmatter = await getFrontmatter(
    'pages',
    appearanceSettings.orderPagesBy,
    appearanceSettings.orderPagesByReversed
  )
  const pageData = pageFrontmatter.map(page => {
    return { name: page.title, tagline: page.tagline, priority: page.weight, slug: page.slug }
  })

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col w-full">
        {categoryData.map(category => (
          <Link className="dropdown-item px-3 py-1 mb-3" key={category.slug} href={`/${category.slug}`}>
            {category.title}
          </Link>
        ))}
      </div>
      {categoryData.length > 0 && pageData.length > 0 && (
        <div className="mb-3 mx-3 opacity-20 border-b border-gray-400"></div>
      )}
      <div className={`flex flex-col w-full  mb-3`}>
        {pageData.map(page => (
          <Link className="dropdown-item px-3 py-1 mb-3" key={page.slug} href={`/page/${page.slug}`}>
            {page.name}
          </Link>
        ))}
        <Link className="dropdown-item px-3 py-1 mb-3" href="/">
          <span>{await getString('navigationMenuHomeButtonLabel', 'Home')}</span>
        </Link>
      </div>
    </div>
  )
}

export default NavigationLinks
