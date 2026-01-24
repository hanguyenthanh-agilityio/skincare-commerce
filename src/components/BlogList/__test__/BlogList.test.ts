/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import BlogList from '../index.astro';

vi.mock('@/i18n', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/i18n')>();
  return {
    ...actual,
    buildRoute: (_route: string, _locale: string, params: { id: string }) => `/blog/${params.id}`,
  };
});

vi.mock('@/ui', () => ({
  Icons: {
    Arrow: '<svg data-testid="arrow-icon"></svg>',
  },
}));

describe('BlogList', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders empty state when blogs is empty', async () => {
    const html = await container.renderToString(BlogList, {
      props: {
        blogs: [],
        locale: 'en',
      },
    });

    expect(html).toContain('No Blogs Available');
    expect(html).toContain('text-gray-500');
  });

  it('renders blog cards when blogs exist', async () => {
    const html = await container.renderToString(BlogList, {
      props: {
        locale: 'en',
        blogs: [
          {
            title: 'Blog 1',
            documentId: '1',
            images: [],
            category: 'Tech',
            locale: 'en',
          },
          {
            title: 'Blog 2',
            documentId: '2',
            images: [],
            category: 'Tech',
            locale: 'en',
          },
        ],
      },
    });

    expect(html).toContain('Blog 1');
    expect(html).toContain('Blog 2');

    expect(html).toContain('href="/blog/1"');
    expect(html).toContain('href="/blog/2"');
  });

  it('applies correct visibility classes for mobile and desktop', async () => {
    const html = await container.renderToString(BlogList, {
      props: {
        locale: 'en',
        limitMobile: 1,
        limitDesktop: 2,
        blogs: [
          { title: 'Blog 1', documentId: '1', images: [], category: 'Tech', locale: 'en' },
          { title: 'Blog 2', documentId: '2', images: [], category: 'Tech', locale: 'en' },
          { title: 'Blog 3', documentId: '3', images: [], category: 'Tech', locale: 'en' },
        ],
      },
    });

    expect(html).toContain('block md:block'); // Blog 1
    expect(html).toContain('hidden md:block'); // Blog 2
    expect(html).toContain('hidden md:hidden'); // Blog 3
  });
});
