// Constants
import { LOCALES, PAGE_SIZE, STRAPI_BASE_URL } from '@/constants';

// Types
import type { Locale, TProduct } from '@/types';

type FetchProductsParams = {
  page?: number;
  pageSize?: number;
  locale?: Locale;
};

export const getProducts = async ({
  page = 1,
  pageSize = PAGE_SIZE.LISTING,
  locale = LOCALES.EN,
}: FetchProductsParams) => {
  // Build query params
  const params = new URLSearchParams({
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    populate: '*',
    locale: locale,
  });

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
