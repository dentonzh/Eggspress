import React from 'react'
import Link from 'next/link'
import getFrontmatter from './getFrontmatter'
import { createSlug, getEggspressSettings, getString } from '../utils'

const FooterLinks = async () => {
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
          <Link className="mb-6 md:mb-3" key={category.slug} href={`/${category.slug}`}>
            <span className="underline-animated">{category.title}</span>
          </Link>
        ))}
      </div>
      {categoryData.length > 0 && pageData.length > 0 && (
        <div className="w-4/5 max-w-[12rem] mb-6 md:mb-3 opacity-20 border-b border-gray-400 dark:border-gray-200"></div>
      )}
      <div className={`flex flex-col w-full  mb-3`}>
        {pageData.map(page => (
          <Link className="mb-6 md:mb-3" key={page.slug} href={`/page/${page.slug}`}>
            <span className="underline-animated">{page.name}</span>
          </Link>
        ))}
        <Link className="mb-6 md:mb-3" href="/">
          <span className="underline-animated">{await getString('footerLinksHomeLinkLabel', 'Home')}</span>
        </Link>
      </div>
    </div>
  )
}

export default FooterLinks
