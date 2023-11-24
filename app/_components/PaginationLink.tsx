'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const PaginationLink = ({text, page}: {text: string, page: number}) => {
  const router = useRouter()

  const handleGotoPage = () => {
    router.push(`/blog/page/${page}`)
  }

  return (
    <div className="flex shrink">
      <div onClick={handleGotoPage} className="underline-animated select-none cursor-pointer font-medium text-gray-800 hover:text-blue-800 dark:text-white hover:dark:text-blue-200">
        {text}
      </div>
    </div>
  )
}

export default PaginationLink