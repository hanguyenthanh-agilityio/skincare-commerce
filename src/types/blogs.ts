import type { StrapiImageType } from './common';

export type TBlog = {
  documentId: string;
  images: StrapiImageType[];
  title: string;
  description?: string;
  subTitle?: string;
  category: string;
};
