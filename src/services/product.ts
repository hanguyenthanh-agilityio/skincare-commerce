// Constants
import { ERROR_MESSAGES, PAGE_SIZE, STRAPI_BASE_URL } from '@/constants';

// Types
import { mapProductToDetail, type Locale, type ProductPageData, type SortValue } from '@/types';

// Effect
import { Effect, pipe, Schema } from 'effect';

// Services
import {
  fetchByDocumentIdEffect,
  ProductDecodeError,
  ProductFetchError,
  ProductNotFoundError,
} from '@/services';

// Schema
import { ProductListResponseSchema } from '@/schemas';

export interface ProductFilters {
  category?: string;
  skinType?: string;
  minPrice: number;
  maxPrice: number;
}

type FetchProductsParams = {
  page?: number;
  pageSize?: number;
  locale: Locale;
  sort?: SortValue;
  filters?: ProductFilters;
};

type Params = {
  id: string;
  locale: Locale;
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

export const getProductsEffect = ({
  page = 1,
  pageSize = PAGE_SIZE.LISTING,
  locale,
  sort,
  filters,
}: FetchProductsParams) =>
  pipe(
    Effect.tryPromise({
      try: async () => {
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

        const res = await fetch(`${STRAPI_BASE_URL}/api/products?${params.toString()}`);

        if (!res.ok) {
          throw new ProductFetchError({
            status: res.status,
            message: ERROR_MESSAGES.PRODUCT_FETCH_FAILED,
          });
        }

        return await res.json();
      },
      catch: (e) =>
        e instanceof ProductFetchError
          ? e
          : new ProductFetchError({
              status: 500,
              message: ERROR_MESSAGES.UNKNOWN,
            }),
    }),

    // Runtime schema validation
    Effect.flatMap((json) =>
      pipe(
        json,
        Schema.decodeUnknown(ProductListResponseSchema),
        Effect.mapError((reason) => new ProductDecodeError({ reason })),
      ),
    ),

    // Map to UI-ready products
    Effect.map((decoded) => ({
      products: decoded.data.map(mapProductToDetail),
      pagination: decoded.meta.pagination,
    })),
  );

export const getProducts = async (params: FetchProductsParams) => {
  try {
    return await Effect.runPromise(getProductsEffect(params));
  } catch {
    return {
      products: [],
      pagination: {
        page: params.page ?? 1,
        pageSize: params.pageSize ?? PAGE_SIZE.LISTING,
        total: 0,
        pageCount: 1,
      },
    };
  }
};

/**
 * Get data Product Detail
 * Uses Effect for safe async handling
 * Decodes and validates response using Effect Schema
 * Returns a UI ready TProduct
 */

export const getProductByDocumentId = ({ id, locale }: Params) =>
  fetchByDocumentIdEffect({
    endpoint: 'products',
    documentId: id,
    locale,
    schema: ProductListResponseSchema,
    fetchError: (ctx) => new ProductFetchError(ctx),
    decodeError: (reason) => new ProductDecodeError({ reason }),
    notFoundError: () => new ProductNotFoundError({ documentId: id }),
    mapItem: mapProductToDetail,
  });

/**
 * Fetch all data required for the Product Detail page
 */
export const getProductPageData = async (
  id: string | undefined,
  locale: Locale,
): Promise<ProductPageData> => {
  // Default return
  const baseResult: ProductPageData = {
    pageNotFound: true,
    productDetail: null,
  };

  if (!id) return baseResult;

  /**
   * Execute Effect in Astro SSR
   * Handle all failure cases explicitly
   * Never leak internal error details to UI
   */
  const productDetail = await Effect.runPromise(
    getProductByDocumentId({ id, locale }).pipe(
      Effect.match({
        onSuccess: (product) => product,
        onFailure: () => null, // Product not found
      }),
    ),
  );

  if (!productDetail) return baseResult;

  return {
    productDetail,
    pageNotFound: false,
  };
};
