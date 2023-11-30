import React from 'react'
import { getEggspressSettings } from '../utils'
import Link from 'next/link'

interface ContentHeroProps {
  trailString?: string,
  trailLink?: string,
  headline?: string,
  subtitle?: string,
  date?: string,
  children?: React.ReactNode
}

const ContentHero = async ({trailString, trailLink, headline, subtitle, date}: ContentHeroProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div>
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className={`${subtitle ? 'mb-6 md:mb-9' : 'mb-3 md:mb-6'} text-4xl md:text-6xl font-bold -ml-0.5 leading-[1.26] md:leading-[1.2]`}>{headline}</h1>
        {subtitle &&
          <div className="text-sm md:text-lg mb-3 md:mb-6">{subtitle}</div>
        }
        {(trailString || date) &&
          <div className="flex text-xs font-medium text-gray-700 dark:text-gray-300">
            <div className={`${trailString && date ? 'border-r border-gray-300 dark:border-gray-500 pr-2 mr-2' : ''} shrink-0`}>
              {trailLink ? <Link className="underline-animated" href={trailLink}>{trailString}</Link> : <div>{trailString}</div>}
            </div>
            {date &&
              <div className="">{date}</div>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default ContentHero