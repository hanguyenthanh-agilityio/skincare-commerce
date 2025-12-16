import type { MarkdownData } from '@/i18n';
import type { HighlightSection, StrapiImageType } from './common';

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

export type SortValue = 'none' | 'price-desc' | 'price-asc' | 'newest' | 'popularity';

export interface SortContent {
  label: string;
  options: Record<SortValue, string>;
}

export interface ProductContent extends MarkdownData {
  highlight: HighlightSection;
  sort: SortContent;
}
