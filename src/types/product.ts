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
import type { RawProduct, RichTextBlock } from '@/schemas';

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
  benefits?: readonly RichTextBlock[];
  usages?: readonly RichTextBlock[];
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

export const mapProductToDetail = (product: RawProduct): TProduct => ({
  documentId: product.documentId,
  name: product.name,
  subTitle: product.subTitle,
  description: product.description,
  price: product.price,
  volume: product.volume,
  stock: product.stock ? Number(product.stock) : 0,
  averageRating:
    product.reviews && product.reviews.length > 0
      ? Number(
          (product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length).toFixed(1),
        )
      : 0,
  thumbnailUrl: product.images[0]?.formats?.thumbnail?.url ?? product.images[0]?.url ?? null,
  images: product.images,
  skinFeel: product.skinFeel,
  ingredients: product.ingredients as RichTextBlock[] | undefined,
  benefits: product.benefits as RichTextBlock[] | undefined,
  usages: product.usages as RichTextBlock[] | undefined,
  reviews: product.reviews?.map((r) => ({
    rating: r.rating,
    comment: r.comment,
    date: new Date(),
  })),
  category: product.category
    ? { name: product.category.name, slug: product.category.slug }
    : undefined,
  skinType: product.skin_type
    ? { name: product.skin_type.name, slug: product.skin_type.slug }
    : undefined,
});
