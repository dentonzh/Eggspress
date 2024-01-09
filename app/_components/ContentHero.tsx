import React from 'react'
import { getColors } from '../utils'
import Link from 'next/link'
import Image from 'next/image'
import DropdownMenu from './DropdownMenu'
import NavigationMenu from './NavigationMenu'
import ShareCopyButton from './ShareCopyButton'
import ShareTwitterButton from './ShareTwitterButton'
import ShareSocialButton from './ShareSocialButton'

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
  showShareButton?: boolean,
  children?: React.ReactNode,
}

const ContentHero = async ({sectionString, sectionLink, headline, subtitle, headlineSeparator, subheading, subtitlePrefix, date, imageSrc, imageAlt, showShareButton}: ContentHeroProps) => {
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
          {(sectionString || date || showShareButton) &&
            <div className="flex text-[13px] font-medium">
              <div className={`${sectionString && (date || showShareButton) ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}>
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
                <div className={`${await getColors('text', 'HeroDate')} ${date && showShareButton ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}>
                  {date}
                </div>
              }
              {showShareButton &&
                <div className={await getColors('text', 'HeroDate')}>
                  <DropdownMenu text="Share">
                    <NavigationMenu>
                      <div className="w-48 px-3 py-6">
                        <div className="dropdown-item mb-3">
                          <ShareCopyButton>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/copy.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2">Copy link</span>
                          </ShareCopyButton>
                        </div>
                        <div className="dropdown-item mb-3">
                          <ShareTwitterButton headline={headline} subtitle={subtitle}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/x.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2">Share on X</span>
                          </ShareTwitterButton>
                        </div>
                        <div className="dropdown-item mb-3">
                          <ShareSocialButton baseUrl={"https://www.facebook.com/sharer.php?u="}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/facebook.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2">Share on Facebook</span>
                          </ShareSocialButton>
                        </div>
                        <div className="dropdown-item mb-3">
                          <ShareSocialButton skipEncode={true} baseUrl={"https://www.linkedin.com/sharing/share-offsite/?url="}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/linkedin.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2">Share on LinkedIn</span>
                          </ShareSocialButton>
                        </div>
                        <div className="dropdown-item">
                          <ShareSocialButton skipEncode={true} baseUrl={"https://www.reddit.com/submit?url="} urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/reddit.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2">Share on Reddit</span>
                          </ShareSocialButton>
                        </div>
                      </div>

                    </NavigationMenu>
                  </DropdownMenu>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ContentHero