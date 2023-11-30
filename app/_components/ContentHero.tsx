import React from 'react'
import { getEggspressSettings } from '../utils'
import Link from 'next/link'
import Image from 'next/image'

interface ContentHeroProps {
  headline?: string,
  subtitle?: string,
  sectionString?: string,
  sectionLink?: string,
  date?: string,
  imageSrc?: string,
  imageAlt?: string,
  children?: React.ReactNode
}

const ContentHero = async ({sectionString, sectionLink, headline, subtitle, date, imageSrc, imageAlt}: ContentHeroProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={`hero bleed-${appearanceSettings.colorThemeLightPrimary} dark:bleed-${appearanceSettings.colorThemeDarkPrimary}`}>
      <div className="flex">
        <h1 className={`grow text-5xl lg:text-6xl font-bold leading-[1.16] md:leading-[1.2] ${subtitle && (sectionString || date) ? 'mb-12 md:mb-8' : subtitle ? 'mb-6' : (sectionString || date) ? 'mb-3 md:mb-6' : 'mb-6'} text-${appearanceSettings.colorHeroHeadlineLight} dark:text-${appearanceSettings.colorHeroHeadlineDark} `}>{headline}</h1>
        <div className="-mt-3 lg:h-36 lg:w-36 rounded-full object-cover overflow-hidden hidden md:block">
          {imageSrc &&
            <Image priority={true} src={imageSrc} width="144" height="144" alt={imageAlt ? `${imageAlt}` : 'Header image'}></Image>
          }
        </div>
      </div>
      <div className="flex flex-wrap">
        <div>
          {subtitle &&
            <div className={`md:text-lg mb-2 md:mb-3 ${imageSrc ? '-mt-4' : '-mt-10'} text-${appearanceSettings.colorHeroSubtitleLight} dark:text-${appearanceSettings.colorHeroSubtitleDark}`}>{subtitle}</div>
          }
          <div className={imageSrc ? 'flex' : ''}></div>
          {(sectionString || date) &&
            <div className="flex text-xs font-medium">
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