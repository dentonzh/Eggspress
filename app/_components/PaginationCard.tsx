import React from 'react'
import PaginationLink from './PaginationLink'

const PaginationCard = ({currentPage, startIndex, endIndex, postCount}: {currentPage: string | number, startIndex: number, endIndex: number, postCount: number}) => {
  const page = typeof currentPage === 'string' ? parseInt(currentPage) : currentPage

  return (
    <div className="flex flex-wrap w-[65ch] py-12 justify-center">
      <div className="w-full text-center font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
        Displaying posts <span className="font-normal">{startIndex + 1} - {endIndex}</span> of <span className="font-normal">{postCount}</span>
      </div>
      <div className="flex">
        {page > 1 &&
          <div className={postCount > endIndex ? 'mr-6' : ''}>
            <PaginationLink text="< Previous Page" page={+page - 1}></PaginationLink>
          </div>
        }
        {postCount > endIndex &&
          <PaginationLink text="Next Page >" page={+page + 1}></PaginationLink>
        }
      </div>
    </div>
  )
}

export default PaginationCard