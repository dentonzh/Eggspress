import React from 'react'
import { getEggspressSettings } from '../utils'
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
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={`hero bleed-${appearanceSettings.colorThemeLightPrimary || 'gray-100'} dark:bleed-${appearanceSettings.colorThemeDarkPrimary || 'slate-900'}`}>
      <div className="flex items-center overflow-x-hidden">
        <div className={`grow text-5xl lg:text-6xl font-bold ${headline && ['E', 'B', 'D', 'F', 'H', 'L', 'P', 'R'].includes(headline.charAt(0)) ? '-ml-0.5' : ''} ${subheading && (sectionString || date) ? 'mb-12 md:mb-8' : subheading ? 'mb-6' : (sectionString || date) ? 'mb-3 md:mb-6' : 'mb-6'} text-${appearanceSettings.colorHeroHeadlineLight} dark:text-${appearanceSettings.colorHeroHeadlineDark} `}>
          <h1 className="inline leading-[1.21] md:leading-[1.42]">{headline}</h1>
          <span>
            {headlineSeparator && subtitle ? headlineSeparator : ''}
          </span>
          <span className={`inline leading-[1.21] md:leading-[1.42] text-${appearanceSettings.colorHeroSubtitleLight || 'gray-500'} dark:text-${appearanceSettings.colorHeroSubtitleLight || 'gray-400'}`}>
            {subtitlePrefix && subtitle ? subtitlePrefix : ''}
          </span>
          {!headlineSeparator && !subtitlePrefix &&
            <div className="inline"> </div>
          }
          <h2 id="hero-subtitle" className={`inline leading-[1.21] md:leading-[1.42] text-${appearanceSettings.colorHeroSubtitleLight || 'gray-500'} dark:text-${appearanceSettings.colorHeroSubtitleLight || 'gray-400'}`}>{subtitle}</h2>
        </div>
        <div className="flex-none lg:h-36 lg:w-36 rounded-full object-cover overflow-hidden hidden md:flex">
          {imageSrc &&
            <Image priority={true} src={imageSrc} width="144" height="144" alt={imageAlt ? `${imageAlt}` : 'Header image'}></Image>
          }
        </div>
      </div>
      <div className="flex flex-wrap">
        <div>
          {subheading &&
            <div className={`font-medium mb-5 md:mb-3 ${imageSrc ? '-mt-4' : 'mt-8 lg:mt-0'} text-${appearanceSettings.colorHeroSubheadingLight} dark:text-${appearanceSettings.colorHeroSubheadingDark}`}>
              {subheading}
            </div>
          }
          <div className={imageSrc ? 'flex' : ''}></div>
          {(sectionString || date) &&
            <div className="flex text-[13px] font-medium">
              <div className={`shrink-0 ${sectionString && date ? 'border-r border-gray-300 dark:border-gray-500 pr-2 mr-2' : ''}`}>
                {sectionString &&
                  <div>
                    {sectionLink ?
                      <Link className={`underline-animated text-${appearanceSettings.colorHeroSectionLinkLight} dark:text-${appearanceSettings.colorHeroSectionLinkDark}`} href={sectionLink}>{sectionString}</Link> 
                      :
                      <div className={`text-${appearanceSettings.colorHeroSectionStringLight} dark:text-${appearanceSettings.colorHeroSectionStringDark}`}>{sectionString}</div>
                    }
                  </div>
                }
              </div>
              {date &&
                <div className={`text-${appearanceSettings.colorHeroDateLight} dark:text-${appearanceSettings.colorHeroDateDark}`}>{date}</div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ContentHero