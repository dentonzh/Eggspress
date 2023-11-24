import getFrontmatter from '../../../_components/getFrontmatter'
import { createSlug, getEggspressSettings } from '../../../utils'
import PostCard from '../../../_components/PostCard'
import PageSidebar from '../../../_components/PageSidebar'
import PaginationLink from '../../../_components/PaginationLink'


export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')

  const categoryMap: Record<any, any> = {}
  postFrontmatter.map(post => {
    categoryMap[createSlug(post.category)] = 1
  })
  
  let params: {category: string, page: string}[] = []

  Object.keys(categoryMap).map(categorySlug => {
    const postCount = postFrontmatter.filter(post => createSlug(post.category) === categorySlug).length
    const pageCount = Math.ceil(postCount / (appearanceSettings.numberOfPostsPerPage || 8))

    for (let i = 0; i < pageCount; i ++) {
      params.push({category: categorySlug, page: (+i + 1).toString()})
    }
  })

  return params
}


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.title
    }
  }
}

export default async function BlogPage({ params }: { params: { category: string, page: string } }) {
  const { category, page } = params
  const pageNumber = parseInt(page)
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8
  
  const categoryPostFrontmatter = postFrontmatter.filter(post => createSlug(post.category) === category)

  const maxPostIndex = pageNumber * numPostsPerPage > categoryPostFrontmatter.length ? categoryPostFrontmatter.length : pageNumber * numPostsPerPage
  const startIndex = pageNumber * numPostsPerPage - numPostsPerPage > categoryPostFrontmatter.length ? maxPostIndex - numPostsPerPage : pageNumber * numPostsPerPage - numPostsPerPage

  return (
    <main className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-4 -ml-0.5">Posts <span className="text-gray-400 dark:text-gray-500">{`//`} Page {page}</span></h1>      
        <div className="font-normal">Displaying {startIndex + 1} - {maxPostIndex} of {categoryPostFrontmatter.length}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='lg:max-w-prose'>
          {categoryPostFrontmatter.slice(startIndex, maxPostIndex).map((frontmatter, index) => 
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter}></PostCard>
          )}
        </div>
        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
        <div className="py-12">
          <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
            Displaying posts {startIndex + 1} - {maxPostIndex} of {categoryPostFrontmatter.length}
          </div>
          <div className="flex">
            {pageNumber > 1 &&
              <div className="mr-6">
                <PaginationLink text="Go back one page" page={+pageNumber - 1}></PaginationLink>
              </div>
            }
            {categoryPostFrontmatter.length > maxPostIndex &&
              <PaginationLink text="Show more posts" page={+pageNumber + 1}></PaginationLink>
            }
          </div>
        </div>
    </main>
  )
}
