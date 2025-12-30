// Constants
import { ERROR_MESSAGES, LOCALES, PAGE_SIZE, STRAPI_BASE_URL } from '@/constants';

// Types
import {
  mapProductToDetail,
  type Locale,
  type ProductPageData,
  type SortValue,
  type TProduct,
} from '@/types';

// Effect
import { Effect, pipe, Schema } from 'effect';

// Services
import { ProductDecodeError, ProductFetchError, ProductNotFoundError } from '@/services';

// Schema
import { ProductListResponseSchema } from '@/schemas';

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

/**
 * Get data Product Detail
 * Uses Effect for safe async handling
 * Decodes and validates response using Effect Schema
 * Returns a UI ready TProduct
 */

export const getProductByDocumentId = ({ id, locale }: Params) =>
  pipe(
    Effect.tryPromise({
      try: async () => {
        const params = new URLSearchParams({
          locale,
          'filters[documentId][$eq]': id,
          populate: '*',
        });

        const res = await fetch(`${STRAPI_BASE_URL}/api/products?${params}`);

        if (!res.ok) {
          throw new ProductFetchError({
            status: res.status,
            message: ERROR_MESSAGES.PRODUCT_FETCH_FAILED,
          });
        }

        return res.json();
      },

      catch: (error) =>
        error instanceof ProductFetchError
          ? error
          : new ProductFetchError({
              status: 500,
              message: ERROR_MESSAGES.UNKNOWN,
            }),
    }),

    Effect.flatMap((json) =>
      pipe(
        json,
        Schema.decodeUnknown(ProductListResponseSchema),
        Effect.mapError((reason) => new ProductDecodeError({ reason })),
      ),
    ),

    Effect.flatMap((decoded) => {
      const product = decoded.data[0];

      if (!product) {
        return Effect.fail(new ProductNotFoundError({ documentId: id }));
      }

      return Effect.succeed(mapProductToDetail(product));
    }),
  );

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
    products: [],
    productDetail: null,
  };

  if (!id) {
    return baseResult;
  }

  const { products } = await getProducts({ locale });

  /**
   * Execute Effect in Astro SSR
   * Handle all failure cases explicitly
   * Never leak internal error details to UI
   */
  let productDetail: TProduct | null;

  try {
    productDetail = await Effect.runPromise(
      getProductByDocumentId({ id, locale }).pipe(
        Effect.match({
          onSuccess: (b) => b,
          onFailure: () => null, // Product not found
        }),
      ),
    );
  } catch {
    productDetail = null;
  }

  if (!productDetail) {
    return baseResult;
  }

  return {
    productDetail,
    products,
    pageNotFound: false,
  };
};
