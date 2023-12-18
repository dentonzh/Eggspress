import React from 'react'
import { getColors } from '../utils'
import Link from 'next/link'
import Image from 'next/image'

interface ContentHeroProps {
  headline?: string,
  subtitle?: string,
  headlineSeparator?: string,
  subtitlePrefix?: string,
  subheading?: string,
  sectionString?: string,
  sectionLink?: string,
  date?: string,
  imageSrc?: string | null,
  imageAlt?: string,
  children?: React.ReactNode
}

const ContentHero = async ({sectionString, sectionLink, headline, subtitle, headlineSeparator, subheading, subtitlePrefix, date, imageSrc, imageAlt}: ContentHeroProps) => {
  const headlineMarginLeft = headline && ['E', 'B', 'D', 'F', 'H', 'L', 'P', 'R'].includes(headline.charAt(0)) ? '-ml-0.5' : ''
  const headlineMarginBottom = subheading && (sectionString || date) ? 'mb-12 md:mb-8' : subheading ? 'mb-6' : (sectionString || date) ? 'mb-3 md:mb-6' : 'mb-6'


  return (
    <div className={`hero ${await getColors('bleed', 'ThemeHero', 'slate-900', 'gray-100')}`}>
      <div className="flex items-center overflow-x-hidden">
        <div className={`grow text-5xl lg:text-6xl font-bold ${headlineMarginLeft} ${headlineMarginBottom} ${await getColors('text', 'HeroHeadline')}`}>
          <h1 className="inline leading-[1.21] md:leading-[1.42]">{headline}</h1>
          <span>
            {headlineSeparator && subtitle ? headlineSeparator : ''}
          </span>
          <span className={`inline leading-[1.21] md:leading-[1.42] ${await getColors('text', 'HeroSubtitle', 'gray-500', 'gray-400')}`}>
            {subtitlePrefix && subtitle ? subtitlePrefix : ''}
          </span>
          {!headlineSeparator && !subtitlePrefix &&
            <div className="inline"> </div>
          }
          <h2 id="hero-subtitle" className={`inline leading-[1.21] md:leading-[1.42] ${await getColors('text', 'HeroSubtitle', 'gray-500', 'gray-400')}`}>{subtitle}</h2>
        </div>
        <div className="flex-none lg:h-36 lg:w-36 rounded-full object-cover overflow-hidden hidden md:flex">
          {imageSrc &&
            <Image 
              priority={true} 
              src={imageSrc} 
              width="144" 
              height="144" 
              sizes="(max-width: 768px) 0vw, 12vw"
              alt={imageAlt ? `${imageAlt}` : 'Header image'}
            ></Image>
          }
        </div>
      </div>
      <div className={`flex flex-wrap ${imageSrc ? 'md:mt-12 lg:mt-0' : ''}`}>
        <div>
          {subheading &&
            <div className={`font-medium mb-5 md:mb-3 ${imageSrc ? '-mt-4' : 'mt-8 lg:mt-0'} ${await getColors('text', 'HeroSubheading')}`}>
              {subheading}
            </div>
          }
          <div className={imageSrc ? 'flex' : ''}></div>
          {(sectionString || date) &&
            <div className="flex text-[13px] font-medium">
              <div className={`${sectionString && date ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}>
                {sectionString &&
                  <div>
                    {sectionLink ?
                      <Link className={`underline-animated ${await getColors('text', 'HeroSectionLink')}`} href={sectionLink}>{sectionString}</Link> 
                      :
                      <div className={await getColors('text', 'HeroSectionString')}>{sectionString}</div>
                    }
                  </div>
                }
              </div>
              {date &&
                <div className={await getColors('text', 'HeroDate')}>{date}</div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ContentHero