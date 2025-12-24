import { Data } from 'effect';

// Constants
import { ERROR_TAGS } from '@/constants';

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
