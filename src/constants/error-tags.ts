export const ERROR_TAGS = {
  // Blog
  BLOG_LIST_FETCH: 'BLOG_LIST_FETCH',
  BLOG_LIST_DECODE: 'BLOG_LIST_DECODE',
  BLOG_NOT_FOUND: 'BlogNotFoundError',
  BLOG_FETCH: 'BlogFetchError',
  BLOG_DECODE: 'BlogDecodeError',

  // Product
  PRODUCT_LIST_FETCH: 'PRODUCT_LIST_FETCH',
  PRODUCT_LIST_DECODE: 'PRODUCT_LIST_DECODE',
  PRODUCT_NOT_FOUND: 'ProductNotFoundError',
  PRODUCT_FETCH: 'ProductFetchError',
  PRODUCT_DECODE: 'ProductDecodeError',
} as const;

export type ErrorTag = (typeof ERROR_TAGS)[keyof typeof ERROR_TAGS];
