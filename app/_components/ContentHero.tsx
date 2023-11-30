import React from 'react'
import { getEggspressSettings } from '../utils'
import Link from 'next/link'

interface ContentHeroProps {
  sectionString?: string,
  sectionLink?: string,
  headline?: string,
  subtitle?: string,
  date?: string,
  children?: React.ReactNode
}

const ContentHero = async ({sectionString, sectionLink, headline, subtitle, date}: ContentHeroProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div>
      <div className={`hero bleed-${appearanceSettings.colorThemeLightPrimary} dark:bleed-${appearanceSettings.colorThemeDarkPrimary}`}>
        <h1 className={`text-5xl md:text-6xl font-bold -ml-0.5 leading-[1.16] md:leading-[1.2] ${subtitle ? 'mb-9 md:mb-12' : 'mb-3 md:mb-6'} text-${appearanceSettings.colorHeroHeadlineLight} dark:text-${appearanceSettings.colorHeroHeadlineDark} `}>{headline}</h1>
        {subtitle &&
          <div className={`md:text-lg mb-2 md:mb-3 text-${appearanceSettings.colorHeroSubtitleLight} dark:text-${appearanceSettings.colorHeroSubtitleDark}`}>{subtitle}</div>
        }
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
  )
}

export default ContentHero