import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Components
import { ProductCard } from '@/components';

describe('ProductCard component', () => {
  it('ProductCard renders all props correctly', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(ProductCard, {
      props: {
        href: '/',
        image: '/perfume.jpg',
        name: 'Midnight Bloom',
        description: 'A deep, mysterious floral fragrance',
        volume: '100ml',
        price: '129.00',
        badge: 'New',
      },
    });

    // Image
    expect(result).toContain('src="/perfume.jpg"');
    expect(result).toContain('alt="Midnight Bloom"');

    // Badge
    expect(result).toContain('<span');
    expect(result).toContain('New</span>');

    // Product info
    expect(result).toContain('Midnight Bloom');
    expect(result).toContain('A deep, mysterious floral fragrance');

    // Volume & Price
    expect(result).toContain('100ml');
    expect(result).toContain('$129.00');

    // Button & Link
    expect(result).toContain('href="/"');

    // Layout classes
    expect(result).toContain('w-331');
    expect(result).toContain('h-586');
    expect(result).toContain('hover:shadow-md');
  });

  it('ProductCard renders without optional badge', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(ProductCard, {
      props: {
        image: '/rose.jpg',
        name: 'Eternal Rose',
        description: 'Classic and timeless',
        volume: '50ml',
        price: '89.00',
      },
    });

    expect(result).not.toContain('badge');
    expect(result).not.toContain('New');
    expect(result).not.toContain('<span');
  });

  it('ProductCard uses NormalBlock with correct props', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(ProductCard, {
      props: {
        image: '/oud.jpg',
        name: 'Royal Oud',
        description: 'Rich and luxurious wood notes',
        volume: '100ml',
        price: '299.00',
      },
    });

    // Name should have font-bold and tracking-[-2%]
    expect(result).toContain('font-bold tracking-[-2%] text-black');
  });
});
