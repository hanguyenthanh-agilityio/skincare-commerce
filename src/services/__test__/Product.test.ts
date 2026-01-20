/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Effect } from 'effect';

import { getProducts, getProductsEffect, getProductPageData } from '@/services/product';

import { apiClient } from '@/services';
import { ERROR_MESSAGES, PAGE_SIZE } from '@/constants';
import type { Locale } from '@/types';

vi.mock('@/services', async () => {
  const actual = await vi.importActual<typeof import('@/services')>('@/services');

  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
    },
  };
});

const locale: Locale = 'en';

// ================== MOCK DATA ==================
const mockImage = {
  id: 1,
  documentId: 'img-1',
  name: 'product.jpg',
  alternativeText: null,
  width: 500,
  height: 500,
  url: '/uploads/product.jpg',
  formats: {},
};

const mockRawProduct = {
  id: 1,
  documentId: 'product-1',
  name: 'Product 1',
  price: 100,
  images: [mockImage],
  publishedAt: '2024-01-01',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

const mockApiResponse = {
  data: [mockRawProduct],
  meta: {
    pagination: {
      page: 1,
      pageSize: 12,
      pageCount: 1,
      total: 1,
    },
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Product service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getProductsEffect | success', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: mockApiResponse,
      error: null,
    });

    const result = await Effect.runPromise(getProductsEffect({ locale }));

    expect(result.products).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it('getProductsEffect | failure when api error', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: null,
      error: { message: ERROR_MESSAGES.PRODUCT_FETCH_FAILED },
    });

    await expect(Effect.runPromise(getProductsEffect({ locale }))).rejects.toBeDefined();
  });

  it('getProducts | success', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: mockApiResponse,
      error: null,
    });

    const result = await getProducts({ locale });

    expect(result.products).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  it('getProducts | fallback on error', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: null,
      error: { message: ERROR_MESSAGES.PRODUCT_FETCH_FAILED },
    });

    const result = await getProducts({ locale });

    expect(result).toEqual({
      products: [],
      pagination: {
        page: 1,
        pageSize: PAGE_SIZE.LISTING,
        total: 0,
        pageCount: 1,
      },
    });
  });

  it('getProductPageData | id undefined', async () => {
    const result = await getProductPageData(undefined, locale);

    expect(result).toEqual({
      pageNotFound: true,
      productDetail: null,
    });
  });

  it('getProductsEffect | apply filters correctly', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: mockApiResponse,
      error: null,
    });

    await Effect.runPromise(
      getProductsEffect({
        locale,
        filters: {
          category: 'cleanser',
          skinType: 'oily',
          minPrice: 50,
          maxPrice: 200,
        },
      }),
    );

    const calledUrl = (apiClient.get as any).mock.calls[0][0] as string;
    const decodedUrl = decodeURIComponent(calledUrl);

    expect(decodedUrl).toContain('filters[category][slug][$eq]=cleanser');
    expect(decodedUrl).toContain('filters[skin_type][slug][$eq]=oily');
    expect(decodedUrl).toContain('filters[price][$gte]=50');
    expect(decodedUrl).toContain('filters[price][$lte]=200');
  });

  it('getProductsEffect | apply sort correctly', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: mockApiResponse,
      error: null,
    });

    await Effect.runPromise(
      getProductsEffect({
        locale,
        sort: 'price_asc',
      }),
    );

    const calledUrl = (apiClient.get as any).mock.calls[0][0] as string;
    const decodedUrl = decodeURIComponent(calledUrl);

    expect(decodedUrl).toContain('sort=price:asc');
  });

  it('getProductsEffect | decode error', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: {
        data: 'INVALID_DATA',
      },
      error: null,
    });

    await expect(Effect.runPromise(getProductsEffect({ locale }))).rejects.toBeInstanceOf(Error);
  });
});
