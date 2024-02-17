import React from 'react'
import getFrontmatter from './getFrontmatter'
import {
  getColors,
  copyImageToPublic,
  getEggspressSettings,
  getImageFilesRecursively,
  buildLink,
  setAnchorTargetProperty,
  isUrlAbsolute,
} from '../utils'
import Image from 'next/image'
import Link from 'next/link'

const getProfileImage = async (imageFileName: string): Promise<string | undefined> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFiles = imageFiles.filter(file => file.name === imageFileName)

  if (profileImageFiles.length) {
    const imageFile = profileImageFiles[0]
    const source = `${imageFile.path}/${imageFile.name}`
    const imageUrl = copyImageToPublic(source, 'images/profile')
    return imageUrl
  } else {
    return ''
  }
}

const AuthorCard = async ({ slug }: { slug: string | undefined }) => {
  const authorFrontmatter = await getFrontmatter('authors')
  const authorData = authorFrontmatter.filter(frontmatter => frontmatter.slug === slug)[0]
  const imageUrl = authorData && authorData.image ? await getProfileImage(authorData.image) : ''
  const appearanceSettings = await getEggspressSettings('appearance')

  if (!authorData) {
    return
  }

  return (
    <div className={`mb-16 ${await getColors('text', 'AuthorCardText', 'gray-200', 'gray-600')}`}>
      <Link
        href={`/author/${slug}`}
        className={`mb-1 flex ${appearanceSettings.showAuthorCardProfileImageOnRight ? 'flex-row-reverse' : 'flex-row'}`}
      >
        {(appearanceSettings.showAuthorCardProfileImage === undefined ||
          appearanceSettings.showAuthorCardProfileImage) &&
        imageUrl &&
        imageUrl.length > 0 ? (
          <div
            className={`${imageUrl.length ? '' : 'hidden'} lg:-ml-2 mr-3 h-11 w-11 rounded-full object-cover overflow-hidden`}
          >
            <Image src={imageUrl} width="56" height="56" alt={`Profile image for ${authorData.name}`}></Image>
          </div>
        ) : (
          <div>
            {(appearanceSettings.showAuthorCardProfileImage === undefined ||
              appearanceSettings.showAuthorCardProfileImage) && (
              <div className="-ml-2 mr-3 h-11 w-11 p-2 rounded-full bg-gray-200 dark:bg-gray-600 duration-150">
                <Image
                  src="/assets/egg.svg"
                  width={96}
                  height={96}
                  alt={`Profile image for ${authorData.name}`}
                ></Image>
              </div>
            )}
          </div>
        )}
        <div
          className={`font-medium my-auto ${await getColors('text', 'AuthorCardHeading')} ${appearanceSettings.showAuthorCardProfileImageOnRight ? 'mr-auto' : ''}`}
        >
          <div className={`mb-0.5 ${authorData.role ? '' : 'pl-2 font-semibold'}`}>{authorData.name || slug}</div>
          {authorData.role && <div className="text-xs">{authorData.role}</div>}
        </div>
      </Link>
      {(appearanceSettings.showAuthorCardDescription === undefined || appearanceSettings.showAuthorCardDescription) &&
        authorData.description && <div className="text-sm py-2 mt-3">{authorData.description}</div>}
      {(appearanceSettings.showAuthorCardLinks === undefined || appearanceSettings.showAuthorCardLinks) && (
        <div className="flex flex-wrap mt-3">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async index => {
            return (
              authorData['socialLink' + index] && (
                <div
                  className={`text-sm w-1/2 md:w-full mb-4 md:mb-2 ${await getColors('text', 'AuthorCardLinkLabel', 'gray-400', 'gray-500')}`}
                >
                  <span className="pr-1 block md:inline-block">
                    {authorData['socialPlatform' + index] && authorData['socialHandle' + index]
                      ? `${authorData['socialPlatform' + index]}: `
                      : 'Social: '}
                  </span>
                  <a
                    href={await buildLink(authorData['socialLink' + index])}
                    target={setAnchorTargetProperty(authorData['socialLink' + index])}
                    rel="nofollow noopener"
                    className={`underline-animated ${await getColors('text', 'AuthorCardLinkText', 'gray-400', 'gray-700')} ${await getColors('hover:text', 'AuthorCardLinkTextHover', 'gray-300', 'gray-800')}`}
                  >
                    {authorData['socialPlatform' + index] && authorData['socialHandle' + index]
                      ? `@${authorData['socialHandle' + index].replace('@', '')}`
                      : authorData['socialPlatform' + index]}
                    {!authorData['socialPlatform' + index] || !authorData['socialPlatform' + index].length
                      ? authorData['socialLink' + index].slice(authorData['socialLink' + index].lastIndexOf('://') + 3)
                      : ''}
                  </a>
                </div>
              )
            )
          })}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async index => {
            return (
              authorData['websiteLink' + index] && (
                <div
                  className={`text-sm w-1/2 md:w-full mb-4 md:mb-2 ${await getColors('text', 'AuthorCardLinkLabel', 'gray-400', 'gray-500')}`}
                >
                  <span className="pr-1 block md:inline-block">{authorData['websiteLabel' + index] || 'Website'}:</span>
                  <a
                    href={await buildLink(authorData['websiteLink' + index])}
                    target={setAnchorTargetProperty(authorData['websiteLink' + index])}
                    rel=""
                    className={`underline-animated ${await getColors('text', 'AuthorCardLinkText', 'gray-400', 'gray-700')} ${await getColors('hover:text', 'AuthorCardLinkTextHover', 'gray-300', 'gray-800')}`}
                  >
                    {authorData['websiteName' + index]
                      ? authorData['websiteName' + index]
                      : authorData['websiteLink' + index].slice(
                          isUrlAbsolute(authorData['websiteName' + index])
                            ? authorData['websiteLink' + index].lastIndexOf('://') + 3
                            : authorData['websiteLink' + index].lastIndexOf('/') + 1
                        )}
                  </a>
                </div>
              )
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AuthorCard
