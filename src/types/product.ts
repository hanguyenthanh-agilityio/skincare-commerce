// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type {
  HighlightSection,
  StrapiImageType,
  MenuItem,
  ProductSection,
  BlogSection,
} from '@/types';

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

export type PriceRangeType = {
  title: string;
  from: string;
  to: string;
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
  priceRange: PriceRangeType;
  product: ProductSection;
  blog: BlogSection;
}

export interface ProductSlugContent extends MarkdownData {
  titleSuffix: string;
  description: string;
  backText: string;
}
export type SectionKey = 'ingredients' | 'benefits' | 'usages';
