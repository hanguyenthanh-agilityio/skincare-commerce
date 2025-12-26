export const ERROR_TAGS = {
  BLOG_NOT_FOUND: 'BlogNotFoundError',
  BLOG_FETCH: 'BlogFetchError',
  BLOG_DECODE: 'BlogDecodeError',

  // Products
  PRODUCT_NOT_FOUND: 'ProductNotFoundError',
  PRODUCT_FETCH: 'ProductFetchError',
  PRODUCT_DECODE: 'ProductDecodeError',
} as const;

export type ErrorTag = (typeof ERROR_TAGS)[keyof typeof ERROR_TAGS];
