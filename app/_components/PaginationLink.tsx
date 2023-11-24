'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

const PaginationLink = ({text, page, category}: {text: string, page: number, category?: string}) => {
  const router = useRouter()

  const buildRoute = () => {
    if (category) {
      router.push(`/${category}/page/${page}`)
      return
    }
    router.push(`/blog/page/${page}`)
  }

  return (
    <div className="flex shrink">
      <div onClick={buildRoute} className="underline-animated select-none cursor-pointer font-medium text-gray-800 hover:text-blue-800 dark:text-white hover:dark:text-blue-200">
        {text}
      </div>
      <div className="h-0.5 overflow-hidden">
        <Link href={category? `/${category}/page/${page}` : `/blog/page/${page}`}>Go to page {page}</Link>
      </div>
    </div>
  )
}

export default PaginationLink