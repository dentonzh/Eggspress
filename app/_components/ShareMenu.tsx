import React from 'react'
import DropdownMenu from './DropdownMenu'
import NavigationMenu from './NavigationMenu'
import ShareCopyButton from './ShareCopyButton'
import ShareEmailButton from './ShareEmailButton'
import ShareXButton from './ShareXButton'
import ShareSocialButton from './ShareSocialButton'
import { getEggspressSettings, getString } from '../utils'
import Image from 'next/image'

type ShareMenuProps = {
  className?: string
  align?: string
  headline?: string
  subtitle?: string
  siteName?: string
}

const ShareMenu = async ({ className, align, headline, subtitle, siteName }: ShareMenuProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={className}>
      <DropdownMenu text={await getString('shareMenuButtonLabel', 'Share')} align={align || 'left-0'}>
        <NavigationMenu>
          <div className="min-w-[10rem] sm:min-w-[12rem] px-3 sm:px-2 pt-6 pb-3">
            <div className="mb-3">
              {(appearanceSettings.showShareByLinkButton === undefined || appearanceSettings.showShareByLinkButton) && (
                <ShareCopyButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  copyStatus={await getString('shareByLinkStatusText', 'Copied!')}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/copy.svg"
                    width={16}
                    height={16}
                    alt="copy link icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">{await getString('shareByLinkButtonLabel', 'Copy link')}</span>
                </ShareCopyButton>
              )}
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByEmailButton === undefined ||
                appearanceSettings.showShareByEmailButton) && (
                <ShareEmailButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  headline={headline}
                  subtitle={subtitle}
                  siteName={siteName}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/mail.svg"
                    width={16}
                    height={16}
                    alt="share by email icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">{await getString('shareByEmailButtonLabel', 'Send email')}</span>
                </ShareEmailButton>
              )}
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByXButton === undefined || appearanceSettings.showShareByXButton) && (
                <ShareXButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  headline={headline}
                  subtitle={subtitle}
                  siteName={siteName}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/x.svg"
                    width={16}
                    height={16}
                    alt="share on x icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>X
                  </span>
                </ShareXButton>
              )}
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByFacebookButton === undefined ||
                appearanceSettings.showShareByFacebookButton) && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:pl-3 sm:pr-8 py-2 block"
                  baseUrl={'https://www.facebook.com/sharer.php?u='}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/facebook.svg"
                    width={16}
                    height={16}
                    alt="share on facebook icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    Facebook
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByLinkedinButton === undefined ||
                appearanceSettings.showShareByLinkedinButton) && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  baseUrl={'https://www.linkedin.com/sharing/share-offsite/?url='}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/linkedin.svg"
                    width={16}
                    height={16}
                    alt="share on linkedin icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    LinkedIn
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByRedditButton === undefined ||
                appearanceSettings.showShareByRedditButton) && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  skipEncode={true}
                  baseUrl={'https://www.reddit.com/submit?url='}
                  urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/reddit.svg"
                    width={16}
                    height={16}
                    alt="share on reddit icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    Reddit
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {appearanceSettings.showShareByHackernewsButton && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:pl-3 sm:pr-8 py-2 block"
                  windowHeight={224}
                  baseUrl={'https://news.ycombinator.com/submitlink?u='}
                  urlSuffix={`&t=${headline || ''} ${subtitle || ''}`}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200 -ml-0.5 -mt-0.5"
                    src="/assets/hackernews.svg"
                    width={20}
                    height={20}
                    alt="share on hackernews icon"
                  ></Image>
                  <span className="pl-2 -ml-1 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    Hacker News
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {appearanceSettings.showShareByFlipboardButton && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  windowWidth={1024}
                  baseUrl={'https://share.flipboard.com/bookmarklet/popout?url='}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/flipboard.svg"
                    width={16}
                    height={16}
                    alt="share on flipboard icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    Flipboard
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {appearanceSettings.showShareByWhatsappButton && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:pl-3 sm:pr-8 py-2 block"
                  windowWidth={1024}
                  baseUrl={'https://api.whatsapp.com/send?text='}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/whatsapp.svg"
                    width={16}
                    height={16}
                    alt="share on whatsapp icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    WhatsApp
                  </span>
                </ShareSocialButton>
              )}
            </div>
            <div className="mb-3">
              {appearanceSettings.showShareByTelegramButton && (
                <ShareSocialButton
                  className="dropdown-item pl-2 sm:px-3 py-2 block"
                  windowWidth={1024}
                  baseUrl={'https://telegram.me/share/url?url='}
                >
                  <Image
                    className="text-gray-500 inline-block dark:brightness-200"
                    src="/assets/telegram.svg"
                    width={16}
                    height={16}
                    alt="share on telegram icon"
                  ></Image>
                  <span className="pl-2 sm:pl-4">
                    <span className="hidden sm:inline">{await getString('shareButtonPrefixLabel', 'Share on')}</span>
                    Telegram
                  </span>
                </ShareSocialButton>
              )}
            </div>
          </div>
        </NavigationMenu>
      </DropdownMenu>
    </div>
  )
}

export default ShareMenu
