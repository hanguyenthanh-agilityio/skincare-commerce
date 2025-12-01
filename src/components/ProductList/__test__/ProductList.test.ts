import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';

// Mocks
import { MOCK_PRODUCTS } from '@/mocks';

// Components
import { ProductList } from '@/components';

describe('ProductList component', () => {
  it('ProductList renders all products when no limit is set', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(ProductList, {
      props: {
        products: MOCK_PRODUCTS,
      },
    });

    // Products are rendered
    expect(result).toContain('Gentle Hydrating Cleanser');
    expect(result).toContain('Vitamin C Brightening Serum');

    // Badges
    expect(result).toContain('New');
    expect(result).toContain('Best Seller');

    // Prices & volumes
    expect(result).toContain('$22');
    expect(result).toContain('$48');
    expect(result).toContain('150ml');
    expect(result).toContain('30ml');

    // Links
    expect(result).toContain('href="/products/gentle-hydrating-cleanser"');
    expect(result).toContain('href="/products/vitamin-c-serum"');

    // No empty state
    expect(result).not.toContain('No Products Available');
  });

  it('ProductList respects the limit prop', async () => {
    const container = await AstroContainer.create();

    const mockProducts = [
      {
        name: 'Cleanser',
        price: 22,
        href: '/1',
        image: '/a.jpg',
        badge: 'New',
        volume: '150ml',
        description: '...',
      },
      {
        name: 'Serum',
        price: 48,
        href: '/2',
        image: '/b.jpg',
        badge: 'Hot',
        volume: '30ml',
        description: '...',
      },
      {
        name: 'Moisturizer',
        price: 35,
        href: '/3',
        image: '/c.jpg',
        volume: '50ml',
        description: '...',
      },
    ];

    const result = await container.renderToString(ProductList, {
      props: {
        products: mockProducts,
        limit: 2,
      },
    });

    expect(result).toContain('Cleanser');
    expect(result).toContain('Serum');
  });

  it('ProductList shows empty state when no products', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(ProductList, {
      props: {
        products: [],
      },
    });

    expect(result).toContain('No Products Available');
    expect(result).toContain('text-center w-full text-gray-500');
    expect(result).not.toContain('href="/products/');
  });
});
