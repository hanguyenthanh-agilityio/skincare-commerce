// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type { HighlightSection, StrapiImageType, MenuItem } from '@/types';

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
  filterMenu: MenuItem[];
}

export interface ProductSlugContent extends MarkdownData {
  titleSuffix: string;
  description: string;
  backText: string;
}
