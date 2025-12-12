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
