/// <reference types="astro/client" />

import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductCard from '../index.astro';

describe('ProductCard', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders product information correctly', async () => {
    const html = await container.renderToString(ProductCard, {
      props: {
        documentId: 'doc-123',
        href: '/products/abc',
        locale: 'en',
        name: 'Test Product',
        subTitle: 'Best Seller',
        volume: '100ml',
        price: 29,
        badge: 'New',
        image: {
          url: '/product.jpg',
          alternativeText: 'Product image',
        },
      },
    });

    // text
    expect(html).toContain('Test Product');
    expect(html).toContain('Best Seller');
    expect(html).toContain('100ml');
    expect(html).toContain('$29');
    expect(html).toContain('New');

    // image
    expect(html).toContain('data-testid="strapi-image"');
    expect(html).toContain('data-src="/product.jpg"');

    // link
    expect(html).toContain('href="/products/abc"');

    // CTA
    expect(html).toContain('data-testid="add-to-cart"');
    expect(html).toContain('data-product-id="doc-123"');
    expect(html).toContain('data-locale="en"');
  });

  it('does not render subtitle when missing', async () => {
    const html = await container.renderToString(ProductCard, {
      props: {
        documentId: 'doc-123',
        href: '/products/abc',
        locale: 'en',
        name: 'Test Product',
        volume: '50ml',
        price: 19,
        image: {
          url: '/product.jpg',
        },
      },
    });

    expect(html).not.toContain('Best Seller');
  });
});
