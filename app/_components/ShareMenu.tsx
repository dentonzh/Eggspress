import React from 'react'
import DropdownMenu from './DropdownMenu'
import NavigationMenu from './NavigationMenu'
import ShareCopyButton from './ShareCopyButton'
import ShareEmailButton from './ShareEmailButton'
import ShareXButton from './ShareXButton'
import ShareSocialButton from './ShareSocialButton'
import { getEggspressSettings } from '../utils'
import Image from 'next/image'

type ShareMenuProps = {
  className?: string,
  align?: string,
  headline?: string,
  subtitle?: string,
  siteName?: string
}

const ShareMenu = async ({className, align, headline, subtitle, siteName}: ShareMenuProps) => {
  const appearanceSettings = await getEggspressSettings('appearance')

  return (
    <div className={className}>
      <DropdownMenu text={appearanceSettings.shareText ? appearanceSettings.shareText : 'Share'} align={align || 'left-0'}>
        <NavigationMenu>
          <div className="w-48 sm:w-56 px-3 py-6">
            <div className="mb-3">
              {(appearanceSettings.showShareByLinkButton === undefined || appearanceSettings.showShareByLinkButton) && 
                <ShareCopyButton className="dropdown-item pl-2 sm:px-3 py-2 block">
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/copy.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4">
                    {appearanceSettings.copyLinkText ? appearanceSettings.copyLinkText : 'Copy link'}
                  </span>
                </ShareCopyButton>
              }
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByEmailButton === undefined || appearanceSettings.showShareByEmailButton) && 
                <ShareEmailButton className="dropdown-item pl-2 sm:px-3 py-2 block" headline={headline} subtitle={subtitle} siteName={siteName}>
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/mail.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4">
                    {appearanceSettings.sendEmailText ? appearanceSettings.sendEmailText : 'Send email'}
                  </span>
                </ShareEmailButton>
              }
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByXButton === undefined || appearanceSettings.showShareByXButton) && 
                <ShareXButton className="dropdown-item pl-2 sm:px-3 py-2 block" headline={headline} subtitle={subtitle} siteName={siteName}>
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/x.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                    {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                  </span>X</span>
                </ShareXButton>
              }
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByFacebookButton === undefined || appearanceSettings.showShareByFacebookButton) && 
                <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" baseUrl={"https://www.facebook.com/sharer.php?u="}>
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/facebook.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                    {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                  </span>Facebook</span>
                </ShareSocialButton>
              }
            </div>
            <div className="mb-3">
              {(appearanceSettings.showShareByLinkedinButton === undefined || appearanceSettings.showShareByLinkedinButton) && 
                <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" skipEncode={true} baseUrl={"https://www.linkedin.com/sharing/share-offsite/?url="}>
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/linkedin.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                    {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                  </span>LinkedIn</span>
                </ShareSocialButton>
              }
            </div>
            <div className="">
              {(appearanceSettings.showShareByRedditButton === undefined || appearanceSettings.showShareByRedditButton) && 
                <ShareSocialButton className="dropdown-item pl-2 sm:px-3 py-2 block" skipEncode={true} baseUrl={"https://www.reddit.com/submit?url="} urlSuffix={`&title=${headline || ''} ${subtitle || ''}`}>
                  <Image className="text-gray-500 inline-block dark:brightness-150" src="/assets/reddit.svg" width={16} height={16} alt="copy link icon"></Image>
                  <span className="pl-2 sm:pl-4"><span className="hidden sm:inline">
                    {`${appearanceSettings.shareOnText ? appearanceSettings.shareOnText : 'Share on'} `}
                  </span>Reddit</span>
                </ShareSocialButton>
              }
            </div>
          </div>

        </NavigationMenu>
      </DropdownMenu>
    </div>
  )
}

export default ShareMenu