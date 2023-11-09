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
}


export interface PostFile {
  name: string;
  path: string;
  extension: string;
  slug: string;
}