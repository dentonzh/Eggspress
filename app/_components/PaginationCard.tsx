import React from 'react'
import PaginationLink from './PaginationLink'
import { getString } from '../utils'

const PaginationCard = async ({
  currentPage,
  startIndex,
  endIndex,
  postCount,
  type,
  slug,
}: {
  currentPage: string | number
  startIndex: number
  endIndex: number
  postCount: number
  type?: string
  slug?: string
}) => {
  const page = typeof currentPage === 'string' ? parseInt(currentPage) : currentPage

  return (
    <div className="flex flex-wrap w-full md:w-[65ch] py-12 justify-center">
      <div className="w-full text-center font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
        {await getString('paginationRangePrefix', 'Displaying posts ')}
        <span className="font-normal">
          {startIndex + 1} - {endIndex}
        </span>
        {await getString('paginationRangeSuffix', '')}
        {await getString('paginationTotalCountPrefix', ' of ')}
        <span className="font-normal">{postCount}</span>
        {await getString('paginationTotalCountSuffix', ' of ')}
      </div>
      <div className="flex">
        {page > 1 && (
          <div className={postCount > endIndex ? 'mr-6' : ''}>
            <PaginationLink
              text={await getString('previousPageButtonLabel', '< Previous Page')}
              page={+page - 1}
              type={type}
              slug={slug}
            ></PaginationLink>
          </div>
        )}
        {postCount > endIndex && (
          <PaginationLink
            text={await getString('nextPageButtonLabel', 'Next Page >')}
            page={+page + 1}
            type={type}
            slug={slug}
          ></PaginationLink>
        )}
      </div>
    </div>
  )
}

export default PaginationCard
