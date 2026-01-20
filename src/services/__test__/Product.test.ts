/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Effect } from 'effect';

import { getProducts, getProductsEffect } from '@/services/product';
import { apiClient } from '@/services';
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
  documentId: 'product-1',
  name: 'Product 1',
  price: 100,
  images: [mockImage],
};

// const mockSingleProductResponse = {
//     data: mockRawProduct,
//     meta: {},
// };

const mockApiResponse = {
  data: [mockRawProduct],
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
    },
  },
};

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

  it('getProducts | success', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: mockApiResponse,
      error: null,
    });

    const result = await getProducts({ locale });

    expect(result.products).toHaveLength(1);
    expect(result.pagination.total).toBe(1);
  });

  // it('getProductByDocumentId | success', async () => {
  //     (apiClient.get as any).mockResolvedValue({
  //         data: {
  //             data: [mockRawProduct],
  //         },
  //         error: null,
  //     });

  //     const product = await Effect.runPromise(
  //         getProductByDocumentId({ id: 'product-1', locale }),
  //     );

  //     expect(product.documentId).toBe('product-1');
  // });

  // it('getProductPageData | product exists', async () => {
  //     (apiClient.get as any).mockResolvedValue({
  //         data: {
  //             data: [mockRawProduct],
  //         },
  //         error: null,
  //     });

  //     const result = await getProductPageData('product-1', locale);

  //     expect(result.pageNotFound).toBe(false);
  //     expect(result.productDetail?.documentId).toBe('product-1');
  // });
});
