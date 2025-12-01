import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Components
import { BlogCard } from '@/components';

describe('BlogCard component', () => {
  it('BlogCard renders correctly with image-based arrow icon', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(BlogCard, {
      props: {
        image: '/products/sonos-move-2.jpg',
        name: 'Sonos Move 2',
        category: 'Portable Speakers',
        href: '/reviews/sonos-move-2',
      },
    });

    // Image (product)
    expect(result).toContain('src="/products/sonos-move-2.jpg"');
    expect(result).toContain('alt="Sonos Move 2"');
    expect(result).toContain('w-166 h-350 md:w-331 md:h-461');

    // Category
    expect(result).toContain('Portable Speakers');
    expect(result).toContain('text-quill-grey');
    expect(result).toContain('tracking-[2%]');
    expect(result).toContain('uppercase');

    // Name
    expect(result).toContain('Sonos Move 2');
    expect(result).toContain('font-bold');
    expect(result).toContain('line-clamp-2');

    // CTA Link
    expect(result).toContain('href="/reviews/sonos-move-2"');
    expect(result).toContain('Read more');
    expect(result).toContain('text-sm text-left hover:text-chart-2');
    expect(result).toContain('aria-label="Go to Sonos Move 2 blog detail"');

    // Arrow icon as image from public folder
    expect(result).toContain('src="/images/arrow-right.svg"');
    expect(result).toContain('alt="Sonos Move 2"'); // same as name
    expect(result).toContain('class="w-4 h-4 inline-block ml-2"');

    // Layout & hover
    expect(result).toContain('hover:shadow-lg');
    expect(result).toContain('flex flex-col gap-10');
  });

  it('BlogCard handles very long product names', async () => {
    const container = await AstroContainer.create();

    const longName =
      'Bowers & Wilkins Pi8 True Wireless Earbuds with Adaptive Noise Cancellation and aptX Lossless';

    const result = await container.renderToString(BlogCard, {
      props: {
        image: '/earbuds.jpg',
        name: longName,
        category: 'True Wireless',
        href: '/bw-pi8',
      },
    });

    expect(result).toContain('line-clamp-2');
    expect(result).toContain('src="/images/arrow-right.svg"');
  });

  it('BlogCard has correct structure and classes', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(BlogCard, {
      props: {
        image: '/test.jpg',
        name: 'Test Card',
        category: 'Demo',
        href: '/test',
      },
    });

    expect(result).toContain('hover:shadow-lg flex flex-col');
  });
});
