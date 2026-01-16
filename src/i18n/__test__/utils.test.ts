import { describe, it, expect } from 'vitest';

// Constants
import { ROUTER, LOCALES } from '@/constants';

import { buildRoute, getAllLocales } from '../utils';

describe('buildRoute', () => {
  it('builds route with dynamic param', () => {
    const result = buildRoute(ROUTER.BLOGS_DETAIL, 'en', {
      id: '123',
    });

    expect(result).toBe('/en/blogs/123');
  });

  it('returns path even when params object is empty', () => {
    const result = buildRoute(ROUTER.ABOUT_US, 'vi', {});

    expect(result).toBe('/vi/about-us');
  });
});

describe('getAllLocales', () => {
  it('returns all locales', () => {
    const locales = getAllLocales();

    expect(locales).toEqual(LOCALES);
  });

  it('returns a new array (immutable)', () => {
    const locales = getAllLocales();

    expect(locales).not.toBe(LOCALES);
  });
});
