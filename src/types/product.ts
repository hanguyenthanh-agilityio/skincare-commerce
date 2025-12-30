// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type {
  HighlightSection,
  StrapiImageType,
  ProductSection,
  BlogSection,
  Review as UIReview,
} from '@/types';

// Schema
import type { Product, RichTextBlock } from '@/schemas';

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
  | 'treat-masque'
  | 'suncare'
  | 'toner'
  | 'shave'
  | 'hydrate'
  | 'eyes-lips';

export type SortValue = 'price_desc' | 'price_asc' | 'newest' | 'popularity';

export interface FilterParams {
  category?: CategoryValue;
  skinType?: SkinTypeValue;
  sort?: SortValue;
  minPrice: number;
  maxPrice: number;
  page: number;
}

export type TProduct = {
  documentId: string;
  name: string;
  subTitle?: string;
  description?: string;
  price: number;
  volume?: string;
  stock: number;
  averageRating: number;
  thumbnailUrl?: string | null;
  images: readonly StrapiImageType[];
  skinFeel?: string;
  ingredients?: readonly RichTextBlock[];
  reviews?: UIReview[];
  category?: {
    name: string;
    slug: string;
  };
  skinType?: {
    name: string;
    slug: string;
  };
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

export interface ProductDetailContent extends MarkdownData {
  review: {
    title: string;
    totalReviews: string;
    ctaLabel: string;
  };
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

export type Attribute = {
  label: string;
  value: string;
};

export interface ProductPageData {
  pageNotFound: boolean;
  products: TProduct[];
  productDetail: TProduct | null;
}

export const mapProductToDetail = (product: Product): TProduct => ({
  documentId: product.documentId,

  name: product.name,
  subTitle: product.subTitle,
  description: product.description,

  price: product.price,
  volume: product.volume,

  stock: product.stock,
  averageRating: product.averageRating,

  thumbnailUrl: product.thumbnailUrl,
  images: product.images,

  skinFeel: product.skinFeel,
  ingredients: product.ingredients,

  reviews: product.reviews?.map((r) => ({
    rating: r.rating,
    comment: r.comment,
    date: new Date(),
  })),

  category: product.category
    ? {
        name: product.category.name,
        slug: product.category.slug,
      }
    : undefined,

  skinType: product.skin_type
    ? {
        name: product.skin_type.name,
        slug: product.skin_type.slug,
      }
    : undefined,
});
