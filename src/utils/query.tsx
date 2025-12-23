import type { FilterParams, CategoryValue, SkinTypeValue, SortValue } from '@/types';

/**
 * Update a query parameter in the current URL.
 *
 * - When a value is provided, the query parameter is set or updated
 * - When the value is undefined, the query parameter is removed
 *
 * Examples:
 * - updateQueryParam('category', 'hydrate')
 *   → /products?category=hydrate
 *
 * - updateQueryParam('category')
 *   → /products
 *
 * @param key - Query parameter name
 * @param value - Query parameter value; if undefined, the parameter is removed
 */
export const updateQueryParam = (key: string, value?: string) => {
  const params = new URLSearchParams(window.location.search);

  if (value === undefined) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  window.location.search = params.toString();
};

/**
 * Extract and normalize filter values from a URL.
 *
 * - Empty string ("") represents "All"
 * - Missing params fall back to defaults
 * - Numbers are safely normalized
 *
 * @param url - Request URL or window.location
 * @returns Normalized filter params
 */
export const getFilterParams = (url: URL): FilterParams => {
  const params = url.searchParams;

  const category = (params.get('category') as CategoryValue) ?? '';

  const skinType = (params.get('skinType') as SkinTypeValue) ?? '';

  const sort = (params.get('sort') as SortValue) ?? '';

  const minPrice = Number(params.get('minPrice') ?? 0);
  const maxPrice = Number(params.get('maxPrice') ?? 2000);

  const page = Math.max(1, Number(params.get('page') ?? 1));

  return {
    category,
    skinType,
    sort,
    minPrice: Number.isNaN(minPrice) ? 0 : minPrice,
    maxPrice: Number.isNaN(maxPrice) ? 2000 : maxPrice,
    page,
  };
};
