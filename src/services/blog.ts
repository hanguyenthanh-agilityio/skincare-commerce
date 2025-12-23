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

export const getBlogByDocumentId = async ({ id, locale }: Params): Promise<TBlog | null> => {
  const params = new URLSearchParams({
    locale,
    'filters[documentId][$eq]': id,
    populate: '*',
  });

  const url = `${STRAPI_BASE_URL}/api/blogs?${params}`;

  const res = await fetch(url);

  if (!res.ok) {
    console.error('Strapi fetch failed:', await res.text());
    return null;
  }

  const json = await res.json();

  const blog = json?.data?.[0];

  if (!blog) return null;

  return blog as TBlog;
};
