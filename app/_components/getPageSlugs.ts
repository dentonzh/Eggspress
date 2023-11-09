import { getMarkdownSlugs } from '../utils'

const getPageSlugs = async (): Promise<{slug: string}[]> => {
  const dir = './my_pages/'
  const slugs = await getMarkdownSlugs(dir)

  return slugs
}

export default getPageSlugs