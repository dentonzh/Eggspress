import React from 'react'
import { getColors, getEggspressSettings } from '../utils'
import Link from 'next/link'
import Image from 'next/image'
import DropdownMenu from './DropdownMenu'
import NavigationMenu from './NavigationMenu'
import ShareCopyButton from './ShareCopyButton'
import ShareTwitterButton from './ShareTwitterButton'
import ShareSocialButton from './ShareSocialButton'
import ShareEmailButton from './ShareEmailButton'

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
  const appearanceSettings = await getEggspressSettings('appearance')
  const metadataSettings = await getEggspressSettings('metadata')
  const isShareVisible = showShareButton && (appearanceSettings.showShareButtonInHeader === undefined || appearanceSettings.showShareButtonInHeader)

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
        {subheading &&
          <div className={`font-medium mb-5 md:mb-3 ${imageSrc ? '-mt-4' : 'mt-8 lg:mt-0'} ${await getColors('text', 'HeroSubheading')}`}>
            {subheading}
          </div>
        }
        <div className={imageSrc ? 'flex' : ''}></div>
        <div className="w-full">

          {(sectionString || date || isShareVisible) &&
            <div className="flex text-[13px] font-medium">
              <div className={`${sectionString && (date || isShareVisible) ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}>
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
                <div className={`${await getColors('text', 'HeroDate')} ${date && isShareVisible ? `border-r ${await getColors('border', 'HeroSectionDateBorder', 'gray-500', 'gray-300')} pr-2 mr-2` : ''}`}>
                  {date}
                </div>
              }
              {isShareVisible &&
                <div className={`${await getColors('text', 'HeroDate')}`}>
                  <DropdownMenu text={appearanceSettings.shareText ? appearanceSettings.shareText : 'Share'} align={!date && !sectionString ? 'left-0' : '-left-16'}>
                    <NavigationMenu>
                      <div className="w-48 sm:w-56 px-3 py-6">
                        <div className="mb-3">
                          <ShareCopyButton className="dropdown-item pl-2 sm:px-3 py-2 block">
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/copy.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4">
                              {appearanceSettings.copyLinkText ? appearanceSettings.copyLinkText : 'Copy link'}
                            </span>
                          </ShareCopyButton>
                        </div>
                        <div className="mb-3">
                          <ShareEmailButton className="dropdown-item pl-2 sm:px-3 py-2 block" headline={headline} subtitle={subtitle} siteName={metadataSettings.title}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/mail.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4">
                              {appearanceSettings.sendEmailText ? appearanceSettings.sendEmailText : 'Send email'}
                            </span>
                          </ShareEmailButton>
                        </div>
                        <div className="mb-3">
                          <ShareTwitterButton className="dropdown-item pl-2 sm:px-3 py-2 block" headline={headline} subtitle={subtitle} siteName={metadataSettings.title}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/x.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                              {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                            </span>X</span>
                          </ShareTwitterButton>
                        </div>
                        <div className="mb-3">
                          <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" baseUrl={"https://www.facebook.com/sharer.php?u="}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/facebook.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                              {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                            </span>Facebook</span>
                          </ShareSocialButton>
                        </div>
                        <div className="mb-3">
                          <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" skipEncode={true} baseUrl={"https://www.linkedin.com/sharing/share-offsite/?url="}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/linkedin.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                              {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                            </span>LinkedIn</span>
                          </ShareSocialButton>
                        </div>
                        <div className="">
                          <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" skipEncode={true} baseUrl={"https://www.reddit.com/submit?url="} urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}>
                            <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/reddit.svg" width={16} height={16} alt="copy link icon"></Image>
                            <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                              {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                            </span>Reddit</span>
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
