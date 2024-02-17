export interface PostItem {
  [key: string]: any
  slug?: string
  title?: string
  subtitle?: string
  date?: string
  weight?: number
  subheading?: string
  author?: string
  snippet?: string
  description?: string
  sidebar?: string
  category?: string
  prevPost?: string
  nextPost?: string
  image?: string
  imagePositionX?: number
  imagePositionY?: number
  showImageInHeader?: boolean
  isVisible?: boolean
  isArchived?: boolean
  isContentHidden?: boolean
  contentMessage?: string
  layout?: string
  tags?: string
  relatedPost1?: string
  relatedPost2?: string
  relatedPost3?: string
  relatedPost4?: string
  relatedPost5?: string
  relatedPost6?: string
  relatedPost7?: string
  relatedPost8?: string
  relatedPost9?: string
}

export interface AuthorItem {
  [key: string]: any
  slug?: string
  name: string
  postnomials?: string
  description?: string
  showImageInHeader?: boolean
  isVisible?: boolean
  isArchived?: boolean
  isContentHidden?: boolean
  contentMessage?: string
  image?: string
  role?: string
  location?: string
  education?: string
  degree?: string
  work?: string
  company?: string
  title?: string
  specialty?: string
  team?: string
  pronouns?: string
  socialPlatform1?: string
  socialLink1?: string
  socialHandle1?: string
  socialPlatform2?: string
  socialLink2?: string
  socialHandle2?: string
  websiteName?: string
  websiteLink?: string
}

export interface PostFile {
  name: string
  path: string
  extension: string
  slug: string
}

export interface ImageFile extends PostFile {
  width?: string | number
  height?: string | number
}

export type OGImage = {
  url: string
  width: string | number
  height: string | number
}
