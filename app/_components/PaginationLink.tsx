'use client'

import { Route } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaginationLink = ({ text, page, type, slug }: { text: string; page: number; type?: string; slug?: string }) => {
  const router = useRouter()

  const pushRoute = () => {
    router.push(buildRoute())
  }

  const buildRoute = () => {
    if (type === 'category') {
      return `/${slug}/page/${page}`
    } else if (type === 'author') {
      return `/author/${slug}/${page}`
    }
    return `/blog/page/${page}`
  }

  return (
    <div className="flex shrink">
      <div
        onClick={pushRoute}
        className="underline-animated select-none cursor-pointer font-medium text-gray-800 hover:text-blue-800 dark:text-white hover:dark:text-blue-200"
      >
        {text}
      </div>
      <div className="h-0.5 w-1 -ml-1 overflow-hidden">
        <Link href={buildRoute() as Route}>Go to page {page}</Link>
      </div>
    </div>
  )
}

export default PaginationLink
