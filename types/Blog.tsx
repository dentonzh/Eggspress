export interface PostItem {
  title: string | null;
  date: string | null;
  slug: string | null;
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
  name: string;
  description: string | null;
  slug: string | null;
  image: string | null;
  role: string | null;
  location: string | null;
  education: string | null;
  work: string | null;
  socialPlatform: string | null;
  socialLink: string | null;
  socialHandle: string | null;
  websiteName: string | null;
  websiteLink: string | null;
}


export interface PostFile {
  name: string;
  path: string;
  extension: string;
  slug: string;
}