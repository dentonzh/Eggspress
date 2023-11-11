import React from 'react'
import getFrontmatter from '../_components/getFrontmatter'
import { createSlug, getEggspressSettings } from '../utils'
import PostCard from '../_components/PostCard'

export async function generateStaticParams() {
  const postFrontmatter = await getFrontmatter('posts')
  const categorySlugsAsSet = new Set(postFrontmatter.filter(post => 
      {if (!post.category) {return false} return true}
    ).map((post) => ({
      category: createSlug(post.category)
    })))
  const categorySlugsAsArray = Array.from(categorySlugsAsSet)
  return categorySlugsAsArray
}

export async function generateMetadata({ params }: { params: {category: string}}) {
  const { category } = params
  const postFrontmatter = await getFrontmatter('posts')
  const filteredPosts = postFrontmatter.filter(post => {if ( createSlug(post.category) === category) { return true } return false })
  const blogSettings = await getEggspressSettings('metadata')
  const appearanceSettings = await getEggspressSettings('appearance')
  const categoryName = filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category)

  return {
    title: `${categoryName} - ${blogSettings.title}`,
    description: `Read the latest ${categoryName} on ${blogSettings.title}`,
    url: `/${category}`,
    openGraph: {
      title: categoryName,
      description: `Read the latest ${categoryName} on ${blogSettings.title}`,
      url: `/${category}`,
      type: 'website',
      siteName: blogSettings.title
    }

  }
}

const page = async ({ params }: { params: { category: string }}) => {
  const { category } = params
  const postFrontmatter = await getFrontmatter('posts')
  const filteredPosts = postFrontmatter.filter(post => {if ( createSlug(post.category) === category) { return true } return false })
  const numbersAsWords: Record<number, string> = {0: 'No', 1: 'One', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine'}
  const appearanceSettings = await getEggspressSettings('appearance')


  return (
    <main className="flex flex-wrap">
      <div className={`hero bleed-${appearanceSettings.colorLightPrimary} dark:bleed-${appearanceSettings.colorDarkPrimary}`}>
        <h1 className="text-5xl font-bold mb-3 -ml-0.5">{ filteredPosts && filteredPosts.length ? filteredPosts[0].category : decodeURI(category) }</h1>
        <div>{filteredPosts.length < 10 ? numbersAsWords[filteredPosts.length] : filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}</div>
      </div>
      <div className="flex justify-between w-full">
        <div className='max-w-prose'>
          {filteredPosts.map(post => 
            <PostCard key={post.slug} post={post}></PostCard>
          )}
        </div>
      </div>
    </main>
  )
}

export default page