/* eslint-disable no-undef */
import { describe, it, expect, beforeEach } from 'vitest';

// Utils
import { updateQueryParam } from '../query';

describe('updateQueryParam util', () => {
  beforeEach(() => {
    // Reset URL before each test
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
