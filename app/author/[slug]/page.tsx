import React from 'react'
import compileContent from '../../_components/compileContent'
import getFrontmatter from '../../_components/getFrontmatter'
import getSlugs from '../../_components/getSlugs'
import Sidebar from '../../_components/Sidebar'
import PostCard from '../../_components/PostCard'
import ContentHero from '../../_components/ContentHero'
import {
  copyImageToPublic,
  getImageFilesRecursively,
  getEggspressSettings,
  getColors,
  buildLink,
  setAnchorTargetProperty,
  isUrlAbsolute,
  getString,
} from '../../utils'
import PaginationLink from '@/app/_components/PaginationLink'
import ContentMessage from '@/app/_components/ContentMessage'

export async function generateStaticParams() {
  const slugs = getSlugs('authors')
  return slugs
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { slug } = params
  const { frontmatter, images } = await compileContent('authors', slug)
  const blogSettings = await getEggspressSettings('metadata')

  return {
    title: `${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`, // add role here? like "Eggie Shellvetica, Editor-in-Chief at ..."
    description: frontmatter.description || frontmatter.snippet,
    url: `/author/${slug}`,
    openGraph: {
      title: `${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
      description: frontmatter.description || frontmatter.snippet,
      url: `/author/${slug}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images,
    },
    robots: {
      index: frontmatter.isVisible === false ? false : true,
    },
  }
}

const getProfileImage = async (imageFileName: string): Promise<string> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFile = imageFiles.filter(file => file.name === imageFileName)[0]

  if (profileImageFile) {
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageSrc = copyImageToPublic(source, 'images/profile')
    return imageSrc || ''
  } else {
    return ''
  }
}

const AuthorPage = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params;
  const { slug } = params
  const { content, frontmatter, contentLength } = await compileContent('authors', slug)
  const appearanceSettings = await getEggspressSettings('appearance')

  const postFrontmatter = await getFrontmatter(
    'posts',
    (frontmatter && frontmatter.orderPostsBy) || appearanceSettings.orderPostsInAuthorsBy,
    (frontmatter && frontmatter.orderPostsByReversed) || appearanceSettings.orderPostsInAuthorsByReversed
  )
  const filteredPosts = postFrontmatter.filter(
    fm =>
      fm.author === slug ||
      fm.author
        ?.split(',')
        .map(x => x.trim())
        .includes(slug)
  )
  const imageSrc = frontmatter && frontmatter.image ? await getProfileImage(frontmatter.image) : ''
  const sections = ['pronouns', 'location', 'education', 'degree', 'work', 'company', 'title', 'specialty', 'team']

  if (!frontmatter) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={frontmatter.name || slug}
        subtitle={frontmatter.postnomials}
        subheading={frontmatter.role || 'Author'}
        sectionString={frontmatter.description}
        imageSrc={imageSrc}
        imageAlt={`Profile image for ${frontmatter.name}`}
      ></ContentHero>

      <ContentMessage frontmatter={frontmatter} />

      <div className="flex justify-between w-full">
        <div className="max-w-prose">
          {filteredPosts && (
            <div className="max-w-prose">
              {filteredPosts.slice(0, appearanceSettings.numberOfPostsPerPage || 8).map((post, index) => (
                <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
              ))}
              {filteredPosts && !filteredPosts.length && (
                <div className="dark:text-gray-200">There are currently no posts to display.</div>
              )}
              {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) && (
                <div className="py-12">
                  <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
                    {appearanceSettings.paginatedSubheadingIndexPrefix}1 -{' '}
                    {appearanceSettings.numberOfPostsPerPage || 8}
                    {appearanceSettings.paginatedSubheadingTotalPrefix}
                    {filteredPosts.length}
                  </div>
                  <PaginationLink
                    text={await getString('showMorePostsButtonLabel', 'Show more posts')}
                    page={2}
                    type="author"
                    slug={slug}
                  ></PaginationLink>
                </div>
              )}
            </div>
          )}

          {contentLength > 0 && (
            <div className="py-12 border-t">
              <h2 className="text-gray-600 dark:text-gray-200 font-semibold mb-3">Biography</h2>
              <div className={`eggspress-content eggspress-content-extended`}>{content}</div>
            </div>
          )}
        </div>

        <Sidebar>
          {sections.map(async (section, index) => {
            return (
              frontmatter[section] && (
                <div
                  key={`${section}-${index}`}
                  className={`sidebar-section ${await getColors('text', 'SidebarText', 'gray-300', 'gray-600')}`}
                >
                  <h4 className={`sidebar-heading ${await getColors('text', 'SidebarHeading')}`}>
                    {section ? section.charAt(0).toUpperCase() + section.slice(1) : ''}
                  </h4>
                  <div>{frontmatter[section]}</div>
                </div>
              )
            )
          })}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async index => {
            return (
              frontmatter['socialLink' + index] && (
                <div
                  className={`mb-6 text-sm ${await getColors('text', 'SidebarText', 'gray-300', 'gray-600')}`}
                  key={`${frontmatter['socialLink' + index]}-${index}`}
                >
                  <div>
                    <h4 className={`sidebar-heading ${await getColors('text', 'SidebarHeading')}`}>
                      {frontmatter['socialPlatform' + index] ? `${frontmatter['socialPlatform' + index]}` : 'Social'}
                    </h4>
                    <a
                      href={await buildLink(frontmatter['socialLink' + index])}
                      target={setAnchorTargetProperty(frontmatter['socialLink' + index])}
                      rel="nofollow noopener"
                      className={`mb-3 underline-animated ${await getColors('text', 'SidebarLinkText')} ${await getColors('hover:text', 'SidebarLinkTextHover')} `}
                    >
                      {frontmatter['socialHandle' + index]
                        ? `@${frontmatter['socialHandle' + index].replace('@', '')}`
                        : ''}
                      {!frontmatter['socialHandle' + index]
                        ? frontmatter['socialLink' + index].slice(
                            isUrlAbsolute(frontmatter['socialLink' + index])
                              ? frontmatter['socialLink' + index].lastIndexOf('://') + 3
                              : frontmatter['socialLink' + index].lastIndexOf('/') + 1
                          )
                        : ''}
                    </a>
                  </div>
                </div>
              )
            )
          })}
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(async index => {
            return (
              frontmatter['websiteLink' + index] && (
                <div
                  className={`mb-6 text-sm text-gray-500 w-1/2 md:w-full ${await getColors('text', 'SidebarText', 'gray-300', 'gray-600')}`}
                  key={`website-link-${frontmatter.slug}-${index}`}
                >
                  <h4 className={`sidebar-heading ${await getColors('text', 'SidebarHeading')}`}>
                    {frontmatter['websiteLabel' + index] || 'Website'}
                  </h4>
                  {frontmatter['websiteDescription' + index] && (
                    <div className="mb-1">{frontmatter['websiteDescription' + index]}</div>
                  )}
                  <a
                    href={await buildLink(frontmatter['websiteLink' + index])}
                    target={setAnchorTargetProperty(frontmatter['websiteLink' + index])}
                    rel=""
                    className={`mb-3 underline-animated ${await getColors('text', 'SidebarLinkText')} ${await getColors('hover:text', 'SidebarLinkTextHover')} `}
                  >
                    {frontmatter['websiteName' + index]
                      ? frontmatter['websiteName' + index]
                      : frontmatter['websiteLink' + index].slice(
                          isUrlAbsolute(frontmatter['websiteLink' + index])
                            ? frontmatter['websiteLink' + index].lastIndexOf('://') + 3
                            : frontmatter['websiteLink' + index].lastIndexOf('/') + 1
                        )}
                  </a>
                </div>
              )
            )
          })}
        </Sidebar>
      </div>
    </div>
  )
}

export default AuthorPage
