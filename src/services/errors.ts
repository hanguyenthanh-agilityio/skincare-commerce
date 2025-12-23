import { Data } from 'effect';

export class BlogNotFoundError extends Data.TaggedError('BlogNotFoundError')<{
  documentId: string;
}> {}

export class BlogFetchError extends Data.TaggedError('BlogFetchError')<{
  status: number;
  message: string;
}> {}

export class BlogDecodeError extends Data.TaggedError('BlogDecodeError')<{
  reason: unknown;
}> {}
