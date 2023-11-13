import { getMarkdownSlugs } from '../utils'

const getPageSlugs = async (): Promise<{slug: string}[]> => {
  const dir = './my_authors/'
  const slugs = await getMarkdownSlugs(dir)

  return slugs
}

export default getPageSlugs