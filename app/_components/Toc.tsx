'use client'
import React, { DOMElement, useEffect, useState } from 'react'
import Link from 'next/link'

type Element = {
  top: number,
  text: string,
  id: string,
  tag: string
}

const Toc = () => {

  const [active, setActive] = useState<string>('')
  const [elements, setElements] = useState<Element[]>([])
  const [hasNoHeadings, setHasNoHeadings] = useState<boolean>(false)  // Prevents infinite loop
  
  const getHeaderData = () => {
    const headings = document.querySelectorAll('h2, h3')  // For more extensive table of contents, add h4, h5, etc.
    let elements: Element[] = []
    if (!headings.length) {
      setHasNoHeadings(true)
      return []
    }
    headings.forEach(el => {
      const headingElement = el as HTMLElement
      elements.push({
        top: headingElement.offsetTop,
        text: headingElement.innerText,
        id: headingElement.id,
        tag: headingElement.tagName.charAt(1),
      })
    })
    return elements
  }

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, elementId: string) => {
    e.preventDefault()
    document.getElementById(elementId)?.scrollIntoView({behavior: "smooth"})
  }

  const isHeadingLevelGreaterThan = (tag: string, level: number) => {
    return /^-?\d+$/.test(tag) && parseInt(tag) > level
  }

  useEffect(() => {
    if (!elements.length && !hasNoHeadings) {
      setElements(getHeaderData)
    }

    const setLinkStyle = (position: number) => {
      let headings = getHeaderData()
      for ( let i = 0; i < headings.length - 1; i ++ ) {
        if ( position < 121 ) {
          setActive('')
          return
        }
        if ( position > headings[headings.length-1].top ) {
          setActive(headings[headings.length-1].id)
          break
        }
        if ( (headings[i].top - 121 < position && headings[i+1].top - 121 >= position) ) {
          setActive(headings[i].id)
          break
        }
      }
    }

    const handleScroll = () => {
      const position = document.documentElement.scrollTop || document.body.scrollTop
      setLinkStyle(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [elements, hasNoHeadings])

  
  return (
    <div className="tracking-wide leading-5 text-sm font-light">
      <ul className="text-gray-500 dark:text-gray-400">
        {elements.map(el =>
          <li key={el.id} id={`toc-${el.id}`}
            className={`
              ${isHeadingLevelGreaterThan(el.tag, 2) ? 'hidden lg:block' : 'mt-2 mb-1'}
              ${active === el.id ? 'text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue- rounded-lg duration-100' : 'hover:text-blue-800 dark:hover:text-blue-400'}
            `}
            style={{paddingLeft: `${isHeadingLevelGreaterThan(el.tag, 2) ? (parseInt(el.tag) * 0.3) : 0}rem`}}
          >
            <Link href={`#${el.id}`} onClick={(e) => {scrollToSection(e, el.id)}} className="flex">
              <svg width="3" height="24" viewBox="0 -9 3 24" 
                className={`${isHeadingLevelGreaterThan(el.tag, 2) ? '' : 'hidden'} mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400`}
              >
                <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
              </svg>
              {el.text}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Toc