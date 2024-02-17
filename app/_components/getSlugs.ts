import { getMarkdownSlugs } from '../utils'

const getSlugs = async (type: string): Promise<{ slug: string }[]> => {
  const dir = `./my_${type}/`
  const slugs = await getMarkdownSlugs(dir)
  return slugs
}

export default getSlugs
