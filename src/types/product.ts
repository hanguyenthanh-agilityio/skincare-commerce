// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type { HighlightSection, StrapiImageType, ProductSection, BlogSection } from '@/types';

export interface FilterContent<T extends string> {
  label: string;
  options: Record<T, string>;
}

export type SortContent = FilterContent<SortValue>;

export type CategoryContent = FilterContent<CategoryValue>;

export type SkinTypeContent = FilterContent<SkinTypeValue>;

export type SkinTypeValue = 'normal' | 'dry' | 'oily' | 'combination' | 'sensitive' | 'mature';

export type CategoryValue =
  | 'cleanse'
  | 'exfoliate'
  | 'treat&masque'
  | 'suncare'
  | 'toner'
  | 'shave'
  | 'hydrate'
  | 'eyes&lips';

export type SortValue = 'price_desc' | 'price_asc' | 'newest' | 'popularity';

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
  category?: SkinTypeValue;
  skinType?: CategoryValue;
};

export type PriceRangeType = {
  title: string;
  from: string;
  to: string;
};

export interface ProductContent extends MarkdownData {
  highlight: HighlightSection;
  sort: SortContent;
  categoryFilter: CategoryContent;
  skinTypeFilter: SkinTypeContent;
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
  value: CategoryValue | SkinTypeValue;
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
