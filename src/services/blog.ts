import { Effect, pipe, Schema } from 'effect';

// Types
import type { Locale, TBlog } from '@/types';

// Services
import { BlogDecodeError, BlogFetchError, BlogNotFoundError } from '@/services';

// Constants
import { ERROR_MESSAGES, STRAPI_BASE_URL } from '@/constants';

// Schemas
import { BlogListResponseSchema } from '@/schemas';

interface GetBlogsResponse {
  blogs: TBlog[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
}

interface Params {
  id: string;
  locale: Locale;
}

export const getBlogs = async ({ locale }: { locale: Locale }): Promise<GetBlogsResponse> => {
  const params = new URLSearchParams({
    locale,
  });

  const url = `${STRAPI_BASE_URL}/api/blogs?${params}&populate=*`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error('Strapi fetch failed:', await res.text());
    return { blogs: [], pagination: null };
  }

  const json = await res.json();

  return {
    blogs: json.data as TBlog[],
    pagination: json.meta?.pagination || null,
  };
};

// Get data Blog detail
export const getBlogByDocumentId = ({ id, locale }: Params) =>
  pipe(
    /**
     * Fetch data from Strapi
     * Convert all failures into BlogFetchError
     */
    Effect.tryPromise({
      try: async () => {
        const params = new URLSearchParams({
          locale,
          'filters[documentId][$eq]': id,
          populate: '*',
        });

        const res = await fetch(`${STRAPI_BASE_URL}/api/blogs?${params}`);

        if (!res.ok) {
          throw new BlogFetchError({
            status: res.status,
            message: ERROR_MESSAGES.BLOG_FETCH_FAILED,
          });
        }

        return res.json();
      },
      catch: (error) =>
        error instanceof BlogFetchError
          ? error
          : new BlogFetchError({
              status: 500,
              message: ERROR_MESSAGES.UNKNOWN,
            }),
    }),

    /**
     * Decode unknown JSON into typed data
     * Runtime validation using Schema
     * Fail with BlogDecodeError if shape is invalid
     */
    Effect.flatMap((json) =>
      pipe(
        json,
        Schema.decodeUnknown(BlogListResponseSchema),
        Effect.mapError((reason) => new BlogDecodeError({ reason })),
      ),
    ),

    /**
     * Business rule
     * Ensure blog exists
     * Fail explicitly if not found
     */
    Effect.flatMap((decoded) => {
      const blog = decoded.data[0];

      if (!blog) {
        return Effect.fail(new BlogNotFoundError({ documentId: id }));
      }

      return Effect.succeed(blog as TBlog);
    }),
  );
