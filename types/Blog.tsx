export interface PostItem {
  slug: string | null;
  title: string | null;
  date: string | null;
  userId: number | null;
  body: string | null;
  snippet: string | null;
  publishDate: string | null;
  layout: string | null;
  category: string | null;
  tags: string | null;
  tagline: string | null;
  weight: string | null;
}

export interface AuthorItem {
  slug: string | null;
  pronouns: string | null;
  name: string;
  description: string | null;
  image: string | null;
  role: string | null;
  location: string | null;
  education: string | null;
  degree: string | null;
  work: string | null;
  company: string | null;
  title: string | null;
  specialty: string | null;
  team: string | null;
  socialPlatform1: string | null;
  socialLink1: string | null;
  socialHandle1: string | null;
  socialPlatform2: string | null;
  socialLink2: string | null;
  socialHandle2: string | null;
  websiteName: string | null;
  websiteLink: string | null;
}


export interface PostFile {
  name: string;
  path: string;
  extension: string;
  slug: string;
}


export interface ImageFile extends PostFile {
  width?: string | number;
  height?: string | number;
}


export type OGImage = {
  url: string,
  width: string | number,
  height: string | number
}