/// <reference types="astro/client" />

import { BlogCard } from '@/components';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, beforeAll, vi } from 'vitest';

vi.mock('@/ui', () => ({
  Icons: {
    Arrow: '<svg data-testid="arrow-icon" aria-hidden="true"></svg>',
  },
}));

describe('BlogCard', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders title, category and image', async () => {
    const html = await container.renderToString(BlogCard, {
      props: {
        href: '/blog/test',
        title: 'Test Blog',
        category: 'Tech',
        image: {
          url: '/img.jpg',
          alternativeText: 'test',
        },
      },
    });

    expect(html).toContain('Test Blog');
    expect(html).toContain('Tech');
    expect(html).toContain('data-testid="strapi-image"');
  });

  it('renders CTA link', async () => {
    const html = await container.renderToString(BlogCard, {
      props: {
        href: '/blog/test',
        title: 'Test Blog',
        category: 'Tech',
        image: {},
      },
    });

    expect(html).toContain('href="/blog/test"');
  });
});
