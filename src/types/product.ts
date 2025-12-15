import type { StrapiImageType } from './common';

export type TProduct = {
  images: StrapiImageType[];
  name: string;
  subTitle?: string;
  description?: string;
  volume: string;
  price: number;
  href: string;
  badge?: string;
};
