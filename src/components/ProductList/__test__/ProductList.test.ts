/// <reference types="astro/client" />

import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductList from '../index.astro';

describe('ProductList', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders empty state when products is empty', async () => {
    const html = await container.renderToString(ProductList, {
      props: {
        locale: 'en',
        products: [],
      },
    });

    expect(html).toContain('No Products Available');
    expect(html).not.toContain('/products/');
  });

  it.skip('renders product cards when products exist (no limit)', async () => {
    const html = await container.renderToString(ProductList, {
      props: {
        locale: 'en',
        products: [
          { documentId: 'p1', name: 'Product 1', slug: 'p1' },
          { documentId: 'p2', name: 'Product 2', slug: 'p2' },
        ],
      },
    });

    const links = html.match(/\/products\/[a-zA-Z0-9-_]+/g) ?? [];

    expect(links.length).toBe(2);

    expect(html).toContain('/products/p1');
    expect(html).toContain('/products/p2');
  });

  it('applies responsive visibility classes when limits are provided', async () => {
    const html = await container.renderToString(ProductList, {
      props: {
        locale: 'en',
        limitMobile: 1,
        limitDesktop: 2,
        products: [
          { documentId: 'p1', name: 'Product 1', slug: 'p1' },
          { documentId: 'p2', name: 'Product 2', slug: 'p2' },
          { documentId: 'p3', name: 'Product 3', slug: 'p3' },
        ],
      },
    });

    expect(html).toContain('block md:block');
    expect(html).toContain('hidden md:hidden');
  });
});
