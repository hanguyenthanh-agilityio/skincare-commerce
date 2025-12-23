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

const applyProductFilters = (params: URLSearchParams, filters?: ProductFilters) => {
  if (!filters) return;

  const { category, skinType, minPrice, maxPrice } = filters;

  if (category) {
    params.set('filters[category][slug][$eq]', category);
  }

  if (skinType) {
    params.set('filters[skin_type][slug][$eq]', skinType);
  }

  if (typeof minPrice === 'number') {
    params.set('filters[price][$gte]', String(minPrice));
  }

  if (typeof maxPrice === 'number') {
    params.set('filters[price][$lte]', String(maxPrice));
  }
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
  applyProductFilters(params, filters);

  const url = `${STRAPI_BASE_URL}/api/products?${params.toString()}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status}): ${res.statusText}`);
  }

  const { data, meta } = await res.json();

  return {
    products: data as TProduct[],
    pagination: meta?.pagination ?? {
      page,
      pageSize,
      total: 0,
      pageCount: 1,
    },
  };
};
