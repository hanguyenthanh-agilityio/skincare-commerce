import type { MarkdownData } from '@/i18n';
import type { StrapiImageType, Locale } from '@/types';

export type TBlog = {
  documentId: string;
  images: StrapiImageType[];
  title: string;
  description?: string;
  subTitle?: string;
  category: string;
  locale: Locale;
};

export type BlogDetailGalleryImages = {
  main: StrapiImageType;
  side: StrapiImageType;
};

export interface BlogDetailContent extends MarkdownData {
  title: string;
  description: string;
  images: BlogDetailGalleryImages;
}

export interface BlogPageData {
  pageNotFound: boolean;
  blogs: TBlog[];
  blogDetail: TBlog | null;
}
