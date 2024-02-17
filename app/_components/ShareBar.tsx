'use client'
import React, { useEffect, useState } from 'react'
import ShareCopyButton from './ShareCopyButton'
import ShareXButton from './ShareXButton'
import ShareSocialButton from './ShareSocialButton'
import ShareEmailButton from './ShareEmailButton'
import Image from 'next/image'

type ShareBarProps = {
  className?: string
  headline?: string
  subtitle?: string
  siteName?: string
  appearanceSettings: Record<any, any>
}

const ShareBar = ({ className, headline, subtitle, siteName, appearanceSettings }: ShareBarProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    mounted && (
      <div className={`flex w-full px-3 ${className}`}>
        {(appearanceSettings.showShareByLinkButton === undefined || appearanceSettings.showShareByLinkButton) && (
          <ShareCopyButton className="inline text-center dropdown-item grow mx-0.5 py-3">
            <Image
              className="share-menu-item"
              src="/assets/copy.svg"
              width={16}
              height={16}
              alt="copy link icon"
            ></Image>
          </ShareCopyButton>
        )}
        {(appearanceSettings.showShareByEmailButton === undefined || appearanceSettings.showShareByEmailButton) && (
          <ShareEmailButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            headline={headline}
            subtitle={subtitle}
            siteName={siteName}
          >
            <Image
              className="share-menu-item"
              src="/assets/mail.svg"
              width={16}
              height={16}
              alt="share by email icon"
            ></Image>
          </ShareEmailButton>
        )}
        {(appearanceSettings.showShareByXButton === undefined || appearanceSettings.showShareByXButton) && (
          <ShareXButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            headline={headline}
            subtitle={subtitle}
          >
            <Image className="share-menu-item" src="/assets/x.svg" width={16} height={16} alt="share on x icon"></Image>
          </ShareXButton>
        )}
        {(appearanceSettings.showShareByFacebookButton === undefined ||
          appearanceSettings.showShareByFacebookButton) && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            baseUrl={'https://www.facebook.com/sharer.php?u='}
          >
            <Image
              className="share-menu-item"
              src="/assets/facebook.svg"
              width={16}
              height={16}
              alt="share on facebook icon"
            ></Image>
          </ShareSocialButton>
        )}
        {(appearanceSettings.showShareByLinkedinButton === undefined ||
          appearanceSettings.showShareByLinkedinButton) && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            baseUrl={'https://www.linkedin.com/sharing/share-offsite/?url='}
          >
            <Image
              className="share-menu-item"
              src="/assets/linkedin.svg"
              width={16}
              height={16}
              alt="share on linkedin icon"
            ></Image>
          </ShareSocialButton>
        )}
        {(appearanceSettings.showShareByRedditButton === undefined || appearanceSettings.showShareByRedditButton) && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            skipEncode={true}
            baseUrl={'https://www.reddit.com/submit?url='}
            urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}
          >
            <Image
              className="share-menu-item"
              src="/assets/reddit.svg"
              width={16}
              height={16}
              alt="share on reddit icon"
            ></Image>
          </ShareSocialButton>
        )}
        {appearanceSettings.showShareByHackernewsButton && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            windowHeight={224}
            baseUrl={'https://news.ycombinator.com/submitlink?u='}
            urlSuffix={`&t=${headline || ''} ${subtitle || ''}`}
          >
            <Image
              className="share-menu-item -ml-0.5 -mt-0.5"
              src="/assets/hackernews.svg"
              width={20}
              height={20}
              alt="share on hackernews icon"
            ></Image>
          </ShareSocialButton>
        )}
        {appearanceSettings.showShareByFlipboardButton && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            baseUrl={'https://share.flipboard.com/bookmarklet/popout?url='}
          >
            <Image
              className="share-menu-item"
              src="/assets/flipboard.svg"
              width={16}
              height={16}
              alt="share on flipboard icon"
            ></Image>
          </ShareSocialButton>
        )}
        {appearanceSettings.showShareByWhatsappButton && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            windowWidth={1024}
            baseUrl={'https://api.whatsapp.com/send?text='}
          >
            <Image
              className="share-menu-item"
              src="/assets/whatsapp.svg"
              width={16}
              height={16}
              alt="share on whatsapp icon"
            ></Image>
          </ShareSocialButton>
        )}
        {appearanceSettings.showShareByTelegramButton && (
          <ShareSocialButton
            className="inline text-center dropdown-item grow mx-0.5 py-3"
            windowWidth={1024}
            baseUrl={'https://telegram.me/share/url?url='}
          >
            <Image
              className="share-menu-item"
              src="/assets/telegram.svg"
              width={16}
              height={16}
              alt="share on telegram icon"
            ></Image>
          </ShareSocialButton>
        )}
      </div>
    )
  )
}

export default ShareBar
