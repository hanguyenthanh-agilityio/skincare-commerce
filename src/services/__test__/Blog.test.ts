/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Effect } from 'effect';

import { getBlogsEffect, getBlogs, getBlogByDocumentId, getBlogPageData } from '@/services/blog';

import { apiClient } from '@/services';
import { ERROR_MESSAGES } from '@/constants';
import type { Locale } from '@/types';

vi.mock('@/services', async () => {
  const actual = await vi.importActual<typeof import('@/services')>('@/services');

  return {
    ...actual,
    apiClient: {
      get: vi.fn(),
    },
  };
});

const locale: Locale = 'en';

const apiBlog = {
  documentId: 'blog-1',
  title: 'Blog 1',
  images: [],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Blog service', () => {
  it('getBlogsEffect | success', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: { data: [apiBlog] },
      error: null,
    });

    const result = await Effect.runPromise(getBlogsEffect({ locale }));

    expect(result.blogs).toEqual([apiBlog]);
    expect(result.pagination).toBeNull();
  });

  it('getBlogsEffect | failure', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: null,
      error: { message: ERROR_MESSAGES.BLOG_FETCH_FAILED },
    });

    await expect(Effect.runPromise(getBlogsEffect({ locale }))).rejects.toBeDefined();
  });

  it('getBlogs | success', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: { data: [apiBlog] },
      error: null,
    });

    const result = await getBlogs({ locale });

    expect(result.blogs).toEqual([apiBlog]);
  });

  it('getBlogs | fallback on error', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: null,
      error: { message: ERROR_MESSAGES.BLOG_FETCH_FAILED },
    });

    const result = await getBlogs({ locale });

    expect(result).toEqual({
      blogs: [],
      pagination: null,
    });
  });

  // it('getBlogByDocumentId | success when found', async () => {
  //     (apiClient.get as any).mockResolvedValue({
  //         data: { data: [apiBlog] },
  //         error: null,
  //     });

  //     const result = await Effect.runPromise(
  //         getBlogByDocumentId({ id: 'blog-1', locale }),
  //     );

  //     expect(result).toEqual(apiBlog);
  // });

  it('getBlogByDocumentId | FAILS when not found', async () => {
    (apiClient.get as any).mockResolvedValue({
      data: { data: [] },
      error: null,
    });

    await expect(
      Effect.runPromise(getBlogByDocumentId({ id: 'not-found', locale })),
    ).rejects.toBeDefined();
  });

  it('getBlogPageData | id undefined', async () => {
    const result = await getBlogPageData(undefined, locale);

    expect(result).toEqual({
      pageNotFound: true,
      blogs: [],
      blogDetail: null,
    });
  });

  // it('getBlogPageData | blog exists', async () => {
  //     (apiClient.get as any)
  //         // getBlogs
  //         .mockResolvedValueOnce({
  //             data: { data: [apiBlog] },
  //             error: null,
  //         })
  //         // getBlogByDocumentId
  //         .mockResolvedValueOnce({
  //             data: { data: [apiBlog] },
  //             error: null,
  //         });

  //     const result = await getBlogPageData('blog-1', locale);

  //     expect(result.pageNotFound).toBe(false);
  //     expect(result.blogDetail).toEqual(apiBlog);
  //     expect(result.blogs).toEqual([apiBlog]);
  // });

  it('getBlogPageData | blog NOT found', async () => {
    (apiClient.get as any)
      // getBlogs
      .mockResolvedValueOnce({
        data: { data: [apiBlog] },
        error: null,
      })
      // getBlogByDocumentId
      .mockResolvedValueOnce({
        data: { data: [] },
        error: null,
      });

    const result = await getBlogPageData('not-found', locale);

    expect(result.pageNotFound).toBe(true);
    expect(result.blogDetail).toBeNull();
    expect(result.blogs).toEqual([]);
  });
});
