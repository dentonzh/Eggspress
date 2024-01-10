'use client'
import React, { useEffect, useState } from 'react'
import ShareCopyButton from './ShareCopyButton'
import ShareXButton from './ShareXButton'
import ShareSocialButton from './ShareSocialButton'
import ShareEmailButton from './ShareEmailButton'
import Image from 'next/image'

type ShareBarProps = {
  className?: string,
  headline?: string,
  subtitle?: string,
  siteName?: string,
  appearanceSettings: Record<any, any>
}


const ShareBar = ({className, headline, subtitle, siteName, appearanceSettings}: ShareBarProps) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  return (mounted &&
    <div className={`flex px-3 ${className}`}>
      {(appearanceSettings.showShareByLinkButton === undefined || appearanceSettings.showShareByLinkButton) &&
        <ShareCopyButton className="inline text-center dropdown-item grow mx-0.5 py-3" showCopyStatus={false}>
          <Image className="share-menu-item" src="/assets/copy.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareCopyButton>
      }
      {(appearanceSettings.showShareByEmailButton === undefined || appearanceSettings.showShareByEmailButton) &&
        <ShareEmailButton className="inline text-center dropdown-item grow mx-0.5 py-3" headline={headline} subtitle={subtitle} siteName={siteName}>
          <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/mail.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareEmailButton>
      }
      {(appearanceSettings.showShareByXButton === undefined || appearanceSettings.showShareByXButton) &&
        <ShareXButton className="inline text-center dropdown-item grow mx-0.5 py-3" headline={headline} subtitle={subtitle}>
          <Image className="share-menu-item" src="/assets/x.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareXButton>
      }
      {(appearanceSettings.showShareByFacebookButton === undefined || appearanceSettings.showShareByFacebookButton) &&
        <ShareSocialButton className="inline text-center dropdown-item grow mx-0.5 py-3" baseUrl={"https://www.facebook.com/sharer.php?u="}>
          <Image className="share-menu-item" src="/assets/facebook.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareSocialButton>
      }
      {(appearanceSettings.showShareByLinkedinButton === undefined || appearanceSettings.showShareByLinkedinButton) &&
        <ShareSocialButton className="inline text-center dropdown-item grow mx-0.5 py-3" skipEncode={true} baseUrl={"https://www.linkedin.com/sharing/share-offsite/?url="}>
          <Image className="share-menu-item" src="/assets/linkedin.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareSocialButton>
      }
      {(appearanceSettings.showShareByRedditButton === undefined || appearanceSettings.showShareByRedditButton) &&
        <ShareSocialButton className="inline text-center dropdown-item grow mx-0.5 py-3" skipEncode={true} baseUrl={"https://www.reddit.com/submit?url="} urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}>
          <Image className="share-menu-item" src="/assets/reddit.svg" width={16} height={16} alt="copy link icon"></Image>
        </ShareSocialButton>
      }
    </div>
  )
}

export default ShareBar