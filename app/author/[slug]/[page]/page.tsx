import React from 'react'
import compileContent from '../../../_components/compileContent'
import getFrontmatter from '../../../_components/getFrontmatter'
import getSlugs from '../../../_components/getSlugs'
import Sidebar from '../../../_components/Sidebar'
import PostCard from '../../../_components/PostCard'
import ContentHero from '../../../_components/ContentHero'
import PaginationCard from '../../../_components/PaginationCard'
import {
  copyImageToPublic,
  getImageFilesRecursively,
  getEggspressSettings,
  buildLink,
  setAnchorTargetProperty,
  isUrlAbsolute,
  getColors,
  getString,
} from '../../../utils'
import ContentMessage from '@/app/_components/ContentMessage'

export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const slugs = await getSlugs('authors')

  let params: { slug: string; page: string }[] = []

  slugs.map(({ slug }) => {
    const filteredPosts = postFrontmatter.filter(
      fm =>
        fm.author === slug ||
        fm.author
          ?.split(',')
          .map(x => x.trim())
          .includes(slug)
    )

    const postCount = filteredPosts.length
    const pageCount = Math.ceil(postCount / (appearanceSettings.numberOfPostsPerPage || 8))

    for (let i = 0; i < pageCount; i++) {
      params.push({ slug: slug, page: (+i + 1).toString() })
    }
  })

  return params
}

export async function generateMetadata(props: { params: Promise<{ slug: string; page: string }> }) {
  const params = await props.params;
  const { slug, page } = params
  const { frontmatter, images } = await compileContent('authors', slug)
  const blogSettings = await getEggspressSettings('metadata')
  const pageNumber = parseInt(page)

  return {
    title: `Page ${pageNumber} - ${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
    description: frontmatter.description || frontmatter.snippet,
    url: `/author/${slug}/${pageNumber}`,
    openGraph: {
      title: `Page ${pageNumber} - ${frontmatter.name}${frontmatter.role ? `, ${frontmatter.role}` : ''}`,
      description: frontmatter.description || frontmatter.snippet,
      url: `/author/${slug}/${pageNumber}`,
      type: 'article',
      siteName: blogSettings.title,
      images: images,
    },
  }
}

const getProfileImage = async (imageFileName: string): Promise<string | undefined> => {
  const imageFiles = await getImageFilesRecursively('my_authors')
  const profileImageFile = imageFiles.filter(file => file.name === imageFileName)[0]

  if (profileImageFile) {
    const source = `${profileImageFile.path}/${profileImageFile.name}`
    const imageSrc = copyImageToPublic(source, 'images/profile')
    return imageSrc
  } else {
    return ''
  }
}

const AuthorPaginatedPage = async (props: { params: Promise<{ slug: string; page: string }> }) => {
  const params = await props.params;
  const { slug, page } = params
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

  const pageNumber = parseInt(page)
  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8

  const endIndex =
    pageNumber * numPostsPerPage > filteredPosts.length ? filteredPosts.length : pageNumber * numPostsPerPage
  const startIndex =
    pageNumber * numPostsPerPage - numPostsPerPage > filteredPosts.length
      ? endIndex - numPostsPerPage
      : pageNumber * numPostsPerPage - numPostsPerPage
  if (!frontmatter) {
    return
  }

  return (
    <div className="flex flex-wrap">
      <ContentHero
        headline={`${frontmatter.name}${frontmatter.postnomials ? ' ' + frontmatter.postnomials : ''}` || slug}
        subtitle={`${await getString('paginationTotalPagesPrefix', ' // Page ')}${pageNumber}${await getString('paginationTotalPagesSuffix', '')}`}
        subheading={`${frontmatter.role} ${frontmatter.role ? '•' : ''} ${await getString('paginationRangePrefix', 'Displaying posts ')}${startIndex + 1} - ${endIndex}${await getString('paginationRangeSuffix', '')}${await getString('paginationTotalCountPrefix', ' of ')}${postFrontmatter.length}${await getString('paginationTotalCountSuffix', '')}`}
        sectionString={frontmatter.description}
        imageSrc={imageSrc}
        imageAlt={`Profile image for ${frontmatter.name}`}
      ></ContentHero>

      <ContentMessage frontmatter={frontmatter} />

      <div className="flex justify-between w-full">
        <div className="max-w-prose">
          {filteredPosts && (
            <div className="max-w-prose">
              {postFrontmatter.slice(startIndex, endIndex).map((post, index) => (
                <PostCard key={`${post.slug}-${index}`} post={post} index={index}></PostCard>
              ))}
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

        {filteredPosts.length > (appearanceSettings.numberOfPostsPerPage || 8) && (
          <PaginationCard
            currentPage={pageNumber}
            startIndex={startIndex}
            endIndex={endIndex}
            postCount={filteredPosts.length}
            type="author"
            slug={slug}
          ></PaginationCard>
        )}
      </div>
    </div>
  )
}

export default AuthorPaginatedPage
