import { STRAPI_BASE_URL } from '@/constants';

// Types
import type { Locale, TBlog } from '@/types';

interface GetBlogsResponse {
  blogs: TBlog[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  } | null;
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
