import { Effect, pipe, Schema } from 'effect';

// Types
import type { BlogPageData, Locale, TBlog } from '@/types';

// Services
import {
  BlogDecodeError,
  BlogFetchError,
  BlogNotFoundError,
  fetchByDocumentIdEffect,
} from '@/services';

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

export const getBlogsEffect = ({ locale }: { locale: Locale }) =>
  pipe(
    Effect.tryPromise({
      try: async () => {
        const params = new URLSearchParams({
          locale,
          populate: '*',
        });

        const res = await fetch(`${STRAPI_BASE_URL}/api/blogs?${params.toString()}`);

        if (!res.ok) {
          throw new BlogFetchError({
            status: res.status,
            message: ERROR_MESSAGES.BLOG_FETCH_FAILED,
          });
        }

        return res.json();
      },
      catch: (e) =>
        e instanceof BlogFetchError
          ? e
          : new BlogFetchError({
              status: 500,
              message: ERROR_MESSAGES.UNKNOWN,
            }),
    }),

    // Runtime validation
    Effect.flatMap((json) =>
      pipe(
        json,
        Schema.decodeUnknown(BlogListResponseSchema),
        Effect.mapError((reason) => new BlogDecodeError({ reason })),
      ),
    ),

    Effect.map((decoded) => ({
      blogs: decoded.data as TBlog[],
      pagination: null,
    })),
  );

export const getBlogs = async ({ locale }: { locale: Locale }): Promise<GetBlogsResponse> => {
  try {
    return await Effect.runPromise(getBlogsEffect({ locale }));
  } catch {
    return {
      blogs: [],
      pagination: null,
    };
  }
};

// Get data Blog detail
export const getBlogByDocumentId = ({ id, locale }: Params) =>
  fetchByDocumentIdEffect({
    endpoint: 'blogs',
    documentId: id,
    locale,
    schema: BlogListResponseSchema,
    fetchError: (ctx) => new BlogFetchError(ctx),
    decodeError: (reason) => new BlogDecodeError({ reason }),
    notFoundError: () => new BlogNotFoundError({ documentId: id }),
    mapItem: (blog) => blog as TBlog,
  });

export const getBlogPageData = async (
  id: string | undefined,
  locale: Locale,
): Promise<BlogPageData> => {
  const baseResult: BlogPageData = {
    // Default return
    pageNotFound: true,
    blogs: [],
    blogDetail: null,
  };

  if (!id) return baseResult;

  const { blogs } = await getBlogs({ locale });

  /**
   * Execute Effect in Astro SSR
   * Handle all failure cases explicitly
   * Never leak internal error details to UI
   */
  const blogDetail = await Effect.runPromise(
    getBlogByDocumentId({ id, locale }).pipe(
      Effect.match({
        onSuccess: (blog) => blog,
        onFailure: () => null, // Blog not found
      }),
    ),
  );

  if (!blogDetail) return baseResult;

  return {
    blogDetail,
    blogs,
    pageNotFound: false,
  };
};
