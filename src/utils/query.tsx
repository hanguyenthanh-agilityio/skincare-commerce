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
