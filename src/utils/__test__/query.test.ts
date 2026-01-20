import { describe, it, expect, beforeEach } from 'vitest';

// Utils
import { getFilterParams, updateQueryParam } from '../query';

describe('getFilterParams', () => {
  it('should return default values when no params are provided', () => {
    const url = new URL('https://example.com/products');

    const result = getFilterParams(url);

    expect(result).toEqual({
      category: null,
      skinType: null,
      sort: null,
      minPrice: 0,
      maxPrice: 2000,
      page: 1,
    });
  });

  it('should correctly parse all valid filter params', () => {
    const url = new URL(
      'https://example.com/products?category=hydrate&skinType=oily&sort=price_asc&minPrice=100&maxPrice=500&page=2',
    );

    const result = getFilterParams(url);

    expect(result).toEqual({
      category: 'hydrate',
      skinType: 'oily',
      sort: 'price_asc',
      minPrice: 100,
      maxPrice: 500,
      page: 2,
    });
  });

  it('should fallback minPrice to 0 when value is NaN', () => {
    const url = new URL('https://example.com/products?minPrice=abc');

    const result = getFilterParams(url);

    expect(result.minPrice).toBe(0);
  });

  it('should fallback maxPrice to 2000 when value is NaN', () => {
    const url = new URL('https://example.com/products?maxPrice=xyz');

    const result = getFilterParams(url);

    expect(result.maxPrice).toBe(2000);
  });

  it('should fallback page to 1 when page is missing', () => {
    const url = new URL('https://example.com/products?category=cleanse');

    const result = getFilterParams(url);

    expect(result.page).toBe(1);
  });

  it('should normalize page to minimum value of 1', () => {
    const url = new URL('https://example.com/products?page=0');

    const result = getFilterParams(url);

    expect(result.page).toBe(1);
  });

  it('should normalize negative page number to 1', () => {
    const url = new URL('https://example.com/products?page=-5');

    const result = getFilterParams(url);

    expect(result.page).toBe(1);
  });

  it('should keep category, skinType, sort as null when params are missing', () => {
    const url = new URL('https://example.com/products?minPrice=50');

    const result = getFilterParams(url);

    expect(result.category).toBeNull();
    expect(result.skinType).toBeNull();
    expect(result.sort).toBeNull();
  });
});

describe('updateQueryParam', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/products');
  });

  it('should add a new query param', () => {
    updateQueryParam('category', 'hydrate');

    expect(window.location.search).toBe('?category=hydrate');
  });

  it('should update an existing query param', () => {
    window.history.pushState({}, '', '/products?category=cleanse&page=2');

    updateQueryParam('category', 'hydrate');

    expect(window.location.search).toBe('?category=hydrate&page=2');
  });

  it('should remove a query param when value is undefined', () => {
    window.history.pushState({}, '', '/products?category=hydrate&page=2');

    updateQueryParam('category');

    expect(window.location.search).toBe('?page=2');
  });

  it('should remove the only param and result in empty search', () => {
    window.history.pushState({}, '', '/products?category=hydrate');

    updateQueryParam('category');

    expect(window.location.search).toBe('');
  });
});
