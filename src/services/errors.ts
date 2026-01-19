import { Data } from 'effect';
import { ERROR_TAGS } from '@/constants/error-tags';

/* -------------------------------------------------------------------------- */
/*                                   BLOG                                     */
/* -------------------------------------------------------------------------- */

// List
export class BlogListFetchError extends Data.TaggedError(ERROR_TAGS.BLOG_LIST_FETCH)<{
  status: number;
  message: string;
}> {}

export class BlogListDecodeError extends Data.TaggedError(ERROR_TAGS.BLOG_LIST_DECODE)<{
  reason: unknown;
}> {}

// Detail
export class BlogNotFoundError extends Data.TaggedError(ERROR_TAGS.BLOG_NOT_FOUND)<{
  documentId: string;
}> {}

export class BlogFetchError extends Data.TaggedError(ERROR_TAGS.BLOG_FETCH)<{
  status: number;
  message: string;
}> {}

export class BlogDecodeError extends Data.TaggedError(ERROR_TAGS.BLOG_DECODE)<{
  reason: unknown;
}> {}

/* -------------------------------------------------------------------------- */
/*                                  PRODUCT                                   */
/* -------------------------------------------------------------------------- */

export class ProductListFetchError extends Data.TaggedError(ERROR_TAGS.PRODUCT_LIST_FETCH)<{
  status: number;
  message: string;
}> {}

export class ProductListDecodeError extends Data.TaggedError(ERROR_TAGS.PRODUCT_LIST_DECODE)<{
  reason: unknown;
}> {}

export class ProductNotFoundError extends Data.TaggedError(ERROR_TAGS.PRODUCT_NOT_FOUND)<{
  documentId: string;
}> {}

export class ProductFetchError extends Data.TaggedError(ERROR_TAGS.PRODUCT_FETCH)<{
  status: number;
  message: string;
}> {}

export class ProductDecodeError extends Data.TaggedError(ERROR_TAGS.PRODUCT_DECODE)<{
  reason: unknown;
}> {}

/* -------------------------------------------------------------------------- */
/*                                   CART                                     */
/* -------------------------------------------------------------------------- */

export class CartFetchError extends Data.TaggedError(ERROR_TAGS.CART_FETCH)<{
  status: number;
  message: string;
}> {}

export class CartAddError extends Data.TaggedError(ERROR_TAGS.CART_ADD)<{
  status: number;
  message: string;
}> {}

export class CartUpdateError extends Data.TaggedError(ERROR_TAGS.CART_UPDATE)<{
  status: number;
  message: string;
}> {}
