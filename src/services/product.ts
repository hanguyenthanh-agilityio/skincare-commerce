// Constants
import { LOCALES, PAGE_SIZE, STRAPI_BASE_URL } from '@/constants';

// Types
import type { Locale, SortValue, TProduct } from '@/types';

export interface ProductFilters {
  category?: string;
  skinType?: string;
  minPrice?: number;
  maxPrice?: number;
}

type FetchProductsParams = {
  page?: number;
  pageSize?: number;
  locale?: Locale;
  sort?: SortValue;
  filters?: ProductFilters;
};

const SORT_MAP: Record<SortValue, string> = {
  price_asc: 'price:asc',
  price_desc: 'price:desc',
  newest: 'publishedAt:desc',
  popularity: 'salesCount:desc',
};

export const getProducts = async ({
  page = 1,
  pageSize = PAGE_SIZE.LISTING,
  locale = LOCALES.EN,
  sort,
  filters,
}: FetchProductsParams) => {
  const params = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    populate: '*',
    locale,
  });

  // Sorting
  if (sort) {
    params.set('sort', SORT_MAP[sort]);
  }

  // Filters
  if (filters?.category) {
    params.set('filters[category][name][$eq]', filters.category);
  }

  if (filters?.skinType) {
    params.set('filters[skin_type][name][$eq]', filters.skinType);
  }

  if (typeof filters?.minPrice === 'number') {
    params.set('filters[price][$gte]', String(filters.minPrice));
  }

  if (typeof filters?.maxPrice === 'number') {
    params.set('filters[price][$lte]', String(filters.maxPrice));
  }

  const url = `${STRAPI_BASE_URL}/api/products?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error('Failed to fetch products:', res.statusText);
    throw new Error(`Error fetching products: ${res.status}`);
  }

  const json = await res.json();

  return {
    products: json.data as TProduct[],
    pagination: json.meta?.pagination ?? {
      page,
      pageSize,
      total: 0,
      pageCount: 1,
    },
  };
};
