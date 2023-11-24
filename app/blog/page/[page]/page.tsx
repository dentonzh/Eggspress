import getFrontmatter from '../../../_components/getFrontmatter'
import { getEggspressSettings } from '../../../utils'
import PostCard from '../../../_components/PostCard'
import PageSidebar from '../../../_components/PageSidebar'
import PaginationLink from '../../../_components/PaginationLink'


export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const pageCount = Math.ceil(postFrontmatter.length / (appearanceSettings.numberOfPostsPerPage || 8))
  let pages = []

  for (let i = 0; i < pageCount; i ++) {
    pages.push(i + 1)
  }
  return pages
}


export async function generateMetadata() {
  const blogSettings = await getEggspressSettings('metadata')
    
  return {
    title: {
      absolute: blogSettings.title
    }
  }
}

export default async function BlogPage({ params }: { params: { page: number } }) {
  const { page } = params
  const postFrontmatter = await getFrontmatter('posts')
  const appearanceSettings = await getEggspressSettings('appearance')
  const numPostsPerPage = appearanceSettings.numberOfPostsPerPage || 8
  const maxPostIndex = page * numPostsPerPage > postFrontmatter.length ? postFrontmatter.length : page * numPostsPerPage 

  return (
    <main className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-4 -ml-0.5">Posts <span className="text-gray-400 dark:text-gray-500">{`//`} Page {page}</span></h1>      
        <div className="font-normal">Displaying {page * numPostsPerPage - numPostsPerPage + 1} - {maxPostIndex} of {postFrontmatter.length}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='lg:max-w-prose'>
          {postFrontmatter.slice(page * numPostsPerPage - numPostsPerPage, maxPostIndex).map((frontmatter, index) => 
            <PostCard key={`${frontmatter.slug}-${index}`} post={frontmatter}></PostCard>
          )}
        </div>
        <div>
          <PageSidebar slug="index"></PageSidebar>
        </div>
      </div>
        <div className="py-12">
          <div className="font-light text-sm mb-2 text-gray-800 dark:text-gray-100">
            Displaying posts {page * numPostsPerPage - numPostsPerPage + 1} - {maxPostIndex} of {postFrontmatter.length}
          </div>
          <div className="flex">
            {page > 1 &&
              <div className="mr-6">
                <PaginationLink text="Go back one page" page={+page - 1}></PaginationLink>
              </div>
            }
            {postFrontmatter.length > maxPostIndex &&
              <PaginationLink text="Show more posts" page={+page + 1}></PaginationLink>
            }
          </div>
        </div>
    </main>
  )
}
