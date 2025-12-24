export const ERROR_TAGS = {
  BLOG_NOT_FOUND: 'BlogNotFoundError',
  BLOG_FETCH: 'BlogFetchError',
  BLOG_DECODE: 'BlogDecodeError',
} as const;

export type ErrorTag = (typeof ERROR_TAGS)[keyof typeof ERROR_TAGS];
