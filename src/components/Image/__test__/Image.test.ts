import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Image from '../index.astro';

describe('Image.astro', () => {
  it('renders an img with src and alt', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example Image',
      },
    });

    // Check src
    expect(result).toContain('src="https://example.com/image.jpg"');
    // Check alt
    expect(result).toContain('alt="Example Image"');
    // Check img tag exists
    expect(result).toContain('<img');
  });

  it('renders srcset when srcSetWidths are provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example Image',
        srcSetWidths: [320, 640, 960],
      },
    });

    // Check srcset contains widths
    expect(result).toContain('https://example.com/image.jpg?w=320 320w');
    expect(result).toContain('https://example.com/image.jpg?w=640 640w');
    expect(result).toContain('https://example.com/image.jpg?w=960 960w');
  });

  it('applies default object-contain class and merges custom class', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Image, {
      props: {
        src: 'https://example.com/image.jpg',
        alt: 'Example Image',
        class: 'rounded-lg',
      },
    });

    expect(result).toContain('class="object-contain rounded-lg"');
  });
});
