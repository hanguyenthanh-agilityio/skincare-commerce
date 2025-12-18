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

export type SkinType = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive';

export type ProductCategory = 'cleanse' | 'exfoliate' | 'treat-masque' | 'body' | 'fragrances';

export type TProduct = {
  images: StrapiImageType[];
  name: string;
  subTitle?: string;
  description?: string;
  volume: string;
  price: number;
  href: string;
  badge?: string;
  slug?: string;
  category?: ProductCategory;
  skinType?: SkinType;
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

export interface ProductContextContent extends MarkdownData {
  titleSuffix: string;
  description: string;
  backText: string;
}

export type ProductContextType = 'category' | 'skinType';

export interface ProductContext {
  type: ProductContextType;
  value: ProductCategory | SkinType;
}
export interface ProductDetailContent extends MarkdownData {
  routine: {
    subTitle: string;
    title: string;
    steps: Record<RoutineStepKey, string>;
  };
  labels: {
    sections: Record<SectionKey, string>;
  };
  image: StrapiImageType;
}

export type RoutineStepKey = 'cleansing' | 'tone' | 'cream';

export type SectionKey = 'ingredients' | 'benefits' | 'usages';
