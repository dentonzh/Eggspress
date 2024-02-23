import React from 'react'
import { getColors, getEggspressSettings } from '../utils'
import Link from 'next/link'
import Image from 'next/image'
import ShareMenu from './ShareMenu'

interface ContentHeroProps {
  headline?: string
  subtitle?: string
  headlineSeparator?: string
  subtitlePrefix?: string
  subheading?: string
  sectionString?: string
  sectionLink?: string
  date?: string
  imageSrc?: string
  imageAlt?: string
  showShareButton?: boolean
  children?: React.ReactNode
}

const ContentHero = async ({
  sectionString,
  sectionLink,
  headline,
  subtitle,
  headlineSeparator,
  subheading,
  subtitlePrefix,
  date,
  imageSrc,
  imageAlt,
  showShareButton,
}: ContentHeroProps) => {
  const headlineMarginLeft =
    headline && ['E', 'B', 'D', 'F', 'H', 'L', 'P', 'R', 'U'].includes(headline.charAt(0)) ? '-ml-[0.065rem]' : ''
  const headlineMarginBottom =
    subheading && (sectionString || date)
      ? 'mb-10 md:mb-12'
      : subheading
        ? 'mb-6'
        : sectionString || date
          ? 'mb-3 md:mb-6'
          : 'mb-6'
  const appearanceSettings = await getEggspressSettings('appearance')
  const metadataSettings = await getEggspressSettings('metadata')
  const isShareVisible =
    showShareButton &&
    (appearanceSettings.showShareButtonInHeader === undefined || appearanceSettings.showShareButtonInHeader)

  return (
    <div className={`hero ${await getColors('bleed', 'ThemeHero', 'slate-900', 'gray-100')}`}>
      <div className="flex items-center overflow-x-hidden">
        <div
          className={`max-w-[24ch] text-4xl lg:text-5xl font-bold ${headlineMarginBottom} ${await getColors('text', 'HeroHeadline')}`}
        >
          <h1 className={`inline leading-[1.32] md:leading-[1.42] ${headlineMarginLeft}`}>{headline}</h1>
          <span>{headline && headlineSeparator && subtitle ? headlineSeparator : ''}</span>
          <span
            className={`inline leading-[1.32] md:leading-[1.42] ${await getColors('text', 'HeroSubtitle', 'gray-500', 'gray-400')}`}
          >
            {headline && subtitlePrefix && subtitle ? subtitlePrefix : ''}
          </span>
          {!headlineSeparator && !subtitlePrefix && <div className="inline"> </div>}
          <h2
            id="hero-subtitle"
            className={`inline leading-[1.32] md:leading-[1.42] ${await getColors('text', 'HeroSubtitle', 'gray-500', 'gray-400')}`}
          >
            {subtitle}
          </h2>
        </div>
        <div className="flex-none ml-auto lg:h-36 lg:w-36 rounded-full object-cover overflow-hidden hidden md:flex">
          {imageSrc && (
            <Image
              priority={true}
              src={imageSrc}
              width="144"
              height="144"
              sizes="(max-width: 768px) 0vw, 12vw"
              alt={imageAlt ? `${imageAlt}` : 'Header image'}
            ></Image>
          )}
        </div>
      </div>
      <div className={`flex flex-wrap ${imageSrc ? 'md:mt-12 lg:mt-0' : ''}`}>
        {subheading &&
          (headline ? (
            <div
              className={`font-medium mb-3 md:mb-3 ${imageSrc ? '-mt-4' : 'mt-8 lg:mt-0'} ${await getColors('text', 'HeroSubheading')}`}
            >
              {subheading}
            </div>
          ) : (
            <h1
              className={`font-medium text-3xl mb-3 md:mb-3 ${['E', 'B', 'D', 'F', 'H', 'L', 'P', 'R', 'U'].includes(subheading.charAt(0)) ? '-ml-0.5' : ''} ${imageSrc ? '-mt-4' : 'mt-8 lg:mt-0'} ${await getColors('text', 'HeroSubheading')}`}
            >
              {subheading}
            </h1>
          ))}
        <div className={imageSrc ? 'flex' : ''}></div>
        <div className="w-full">
          {(sectionString || date || isShareVisible) && (
            <div className="flex text-[13px] font-medium">
              <div
                className={`${sectionString && (date || isShareVisible) ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}
              >
                {sectionString && (
                  <div>
                    {sectionLink ? (
                      <Link
                        className={`underline-animated ${await getColors('text', 'HeroSectionLink')}`}
                        href={sectionLink}
                      >
                        {sectionString}
                      </Link>
                    ) : (
                      <div className={await getColors('text', 'HeroSectionString')}>{sectionString}</div>
                    )}
                  </div>
                )}
              </div>
              {date && (
                <div
                  className={`${await getColors('text', 'HeroDate')} ${date && isShareVisible ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}
                >
                  {date}
                </div>
              )}
              {isShareVisible && (
                <ShareMenu
                  className={`${await getColors('text', 'HeroDate')}`}
                  align={date || sectionString ? '-left-16' : ''}
                  siteName={metadataSettings.title}
                  headline={headline}
                  subtitle={subtitle}
                ></ShareMenu>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContentHero
