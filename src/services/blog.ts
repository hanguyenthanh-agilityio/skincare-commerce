import { Effect } from 'effect';

import { STRAPI_BASE_URL } from '@/constants';

// Types
import type { Locale, TBlog } from '@/types';

// Services
import { BlogFetchError, BlogNotFoundError } from '@/services';

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
  Effect.tryPromise({
    try: async () => {
      const params = new URLSearchParams({
        locale,
        'filters[documentId][$eq]': id,
        populate: '*',
      });

      const url = `${STRAPI_BASE_URL}/api/blogs?${params}`;
      const res = await fetch(url);

      if (!res.ok) {
        const message = await res.text();
        throw new BlogFetchError({
          status: res.status,
          message,
        });
      }

      const json = await res.json();
      return json;
    },
    catch: (error) =>
      error instanceof BlogFetchError
        ? error
        : new BlogFetchError({
            status: 500,
            message: 'Unknown fetch error',
          }),
  }).pipe(
    // decode logic
    Effect.flatMap((json) => {
      const blog = json?.data?.[0];

      if (!blog) {
        return Effect.fail(new BlogNotFoundError({ documentId: id }));
      }

      return Effect.succeed(blog as TBlog);
    }),
  );
