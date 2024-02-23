'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import FloatingActionButton from './FloatingActionButton'

type Element = {
  top: number
  text: string
  id: string
  tag: string
}

type TocProps = {
  jumpToText?: string
  tableOfContentsText?: string
  backToTopText?: string
}

let returnToTopTimer: NodeJS.Timeout | undefined

const Toc = ({ jumpToText, tableOfContentsText, backToTopText }: TocProps) => {
  const [active, setActive] = useState<string>('')
  const [elements, setElements] = useState<Element[]>([])
  const [showToc, setShowToc] = useState<boolean>(false) // allows fade-in animation
  const [showReturnToTop, setShowReturnToTop] = useState<boolean>(false) // allows fade-in animation
  const [hasNoHeadings, setHasNoHeadings] = useState<boolean>(false) // Prevents infinite loop

  const getHeaderData = () => {
    const headings = document.querySelectorAll('h2, h3, h4') // For more extensive table of contents, add, h5, h6 etc.
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
    document
      .getElementById(elementId)
      ?.scrollIntoView({ behavior: 'smooth', block: elementId === 'mobile-toc' ? 'center' : 'start' })
    if (elementId === 'mobile-toc') {
      clearTimeout(returnToTopTimer)
      setShowReturnToTop(false)
      returnToTopTimer = undefined
    } else {
      clearTimeout(returnToTopTimer)
      returnToTopTimer = undefined
      setShowReturnToTop(true)
      returnToTopTimer = setTimeout(() => {
        setShowReturnToTop(false)
      }, 6000)
    }
  }

  const isHeadingLevelGreaterThan = (tag: string, level: number) => {
    return /^-?\d+$/.test(tag) && parseInt(tag) > level
  }

  useEffect(() => {
    if (!elements.length && !hasNoHeadings) {
      setElements(getHeaderData)
      setShowToc(true)
    }

    const setLinkStyle = (position: number) => {
      let headings = getHeaderData()
      for (let i = 0; i < headings.length - 1; i++) {
        if (position < 121) {
          setActive('')
          return
        }
        if (position > headings[headings.length - 1].top) {
          setActive(headings[headings.length - 1].id)
          break
        }
        if (headings[i].top - 121 < position && headings[i + 1].top - 121 >= position) {
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
    <div
      className={`${showToc && elements.filter(el => el.id !== 'hero-subtitle').length ? 'opacity-100' : 'opacity-0 h-0'} tracking-wide leading-5 text-sm duration-200`}
    >
      {showToc && elements.filter(el => el.id !== 'hero-subtitle').length > 1 && (
        <div className="mb-20">
          <div id="mobile-toc" className="text-gray-600 dark:text-gray-300 font-extralight mb-3 lg:hidden">
            {jumpToText || 'Jump to...'}
          </div>
          <div id="mobile-toc" className="text-gray-600 dark:text-gray-300 font-extralight mb-3 hidden lg:block">
            {tableOfContentsText || 'Table of Contents'}
          </div>
          <ul className="text-gray-600 dark:text-gray-200">
            {elements
              .filter(el => el.id !== 'hero-subtitle')
              .map(el => (
                <li
                  key={el.id}
                  id={`toc-${el.id}`}
                  className={`mt-2 mb-3 lg:mb-1
                  ${isHeadingLevelGreaterThan(el.tag, 2) ? 'hidden lg:block' : ''}
                  ${active === el.id ? 'text-blue-700 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-200 rounded-lg duration-100' : 'hover:text-blue-800 dark:hover:text-blue-400'}
                `}
                  style={{ paddingLeft: `${isHeadingLevelGreaterThan(el.tag, 2) ? parseInt(el.tag) * 0.5 : 0}rem` }}
                >
                  <Link
                    href={`#${el.id}`}
                    onClick={e => {
                      scrollToSection(e, el.id)
                    }}
                    className="flex"
                  >
                    {isHeadingLevelGreaterThan(el.tag, 2) && (
                      <svg
                        width="3"
                        height="24"
                        viewBox="0 -6 3 24"
                        className="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-400"
                      >
                        <path
                          d="M0 0L3 3L0 6"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        ></path>
                      </svg>
                    )}
                    {el.text}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
      <FloatingActionButton
        icon="top.svg"
        text={backToTopText || 'Back to top'}
        hidden={!showReturnToTop}
        onClick={e => {
          scrollToSection(e as any, 'mobile-toc')
        }}
      ></FloatingActionButton>
    </div>
  )
}

export default Toc
