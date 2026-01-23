import { BlogCard } from '@/components';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, vi, beforeAll } from 'vitest';

vi.mock('@/components/StrapiImage', () => {
  return {
    default: () => null,
  };
});

describe('BlogCard component', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders blog title and category', async () => {
    const result = await container.renderToString(BlogCard, {
      params: {
        locale: 'en',
      },
      props: {
        href: '/blog/hello',
        title: 'Hello World',
        category: 'Tech',
        image: {
          url: '/image.png',
          alternativeText: 'Blog image',
        },
      },
    });

    expect(result).toContain('Hello World');
    expect(result).toContain('Tech');
  });

  it('renders CTA link with correct href', async () => {
    const result = await container.renderToString(BlogCard, {
      params: {
        locale: 'en',
      },
      props: {
        href: '/blog/hello',
        title: 'Hello World',
        category: 'Tech',
        image: {},
      },
    });

    expect(result).toMatch(/href="\/blog\/hello"/);
  });
});
