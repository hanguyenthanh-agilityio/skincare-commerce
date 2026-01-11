export const ERROR_MESSAGES = {
  // Common
  UNKNOWN: 'Something went wrong. Please try again later.',
  MISSING_ID: 'Missing blog documentId',

  // Blog
  BLOG_FETCH_FAILED: 'Failed to fetch blog data',
  BLOG_NOT_FOUND: 'Blog not found',
  BLOG_DECODE_FAILED: 'Failed to decode blog response',

  // Blog
  PRODUCT_FETCH_FAILED: 'Failed to fetch product data',
  PRODUCT_NOT_FOUND: 'Product not found',
  PRODUCT_DECODE_FAILED: 'Failed to decode product response',

  // Cart
  CART_FETCH_FAILED: 'Failed to fetch cart',
} as const;
