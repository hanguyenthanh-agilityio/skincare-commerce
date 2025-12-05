import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';

import serum from '@/assets/images/serum.png';

// Component
import { Image } from '@/components';

describe('Image component', () => {
  it('renders responsive srcset with default widths', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: serum,
        alt: 'Image',
      },
    });

    expect(result).toMatch(/srcset="/);

    expect(result).toMatch(/320w/);
    expect(result).toMatch(/562w/);
  });

  it('merges default and custom class names', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: serum,
        alt: 'Image',
        class: 'rounded-lg',
      },
    });

    expect(result).toContain('class="object-contain rounded-lg"');
  });

  it('applies LCP settings when isLCP=true', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: serum,
        alt: 'Image',
        isLCP: true,
      },
    });

    expect(result).toContain('loading="eager"');
    expect(result).toContain('fetchpriority="high"');
  });

  it('renders placeholder div when no src is provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: { src: null },
    });

    expect(result).toContain('<div');
    expect(result).not.toContain('<img');
  });
});
