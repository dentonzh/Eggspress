import { getMarkdownSlugs } from '../utils'

const getPostSlugs = async (): Promise<{slug: string}[]> => {
  const dir = './my_posts/'
  const slugs = await getMarkdownSlugs(dir)

  return slugs
}

export default getPostSlugs