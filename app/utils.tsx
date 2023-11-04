export function createSlug(categoryName: string|null) {
  if (!categoryName) {
    return ''
  }
  return categoryName.toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}