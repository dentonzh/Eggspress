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
  const [hasNoHeaders, setHasNoHeaders] = useState<boolean>(false)  // Prevents infinite loop
  
  const getHeaderData = () => {
    const headings = document.querySelectorAll('h2, h3')  // For more extensive table of contents, add h4, h5, etc.
    let elements: Element[] = []
    if (!headings.length) {
      setHasNoHeaders(true)
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

  const isHeadingLevelGreaterThan = (tag: string, level: number) => {
    return /^-?\d+$/.test(tag) && parseInt(tag) > level
  }

  useEffect(() => {
    if (!elements.length && !hasNoHeaders) {
      setElements(getHeaderData)
    }

    const setLinkStyle = (position: number) => {
      let headers = getHeaderData()
      for ( let i = 0; i < headers.length - 1; i ++ ) {
        if ( position < 200 ) {
          setActive('')
          return
        }
        if ( headers[i].top < position && headers[i+1].top >= position ) {
          setActive(headers[i].id)
        }
      }
    }

    const handleScroll = () => {
      const position = document.documentElement.scrollTop || document.body.scrollTop
      setLinkStyle(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [elements])

  
  return (
    <div className="tracking-wide leading-relaxed text-sm">
      <ul className="text-gray-800 dark:text-gray-200">
        {elements.map(el =>
          <li key={el.id} id={`toc-${el.id}`}
            className={`
              ${isHeadingLevelGreaterThan(el.tag, 2) ? 'hidden lg:block' : ''}
              ${active === el.id ? 'text-blue-700 dark:text-blue-300 font-bold duration-100' : ''}
            `}
            style={{paddingLeft: `${isHeadingLevelGreaterThan(el.tag, 2) ? (parseInt(el.tag) * 0.3) : 0}rem`}}
          >
            <Link href={`#${el.id}`}>
              {el.text}
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Toc