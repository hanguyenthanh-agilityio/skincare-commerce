/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ImageWrapper from '../index.astro';

vi.mock('@/components', () => ({
  StrapiImage: {
    default: (Astro: { props: { image?: string | { url?: string }; className?: string } }) => {
      const { image, className } = Astro.props;

      const src = typeof image === 'string' ? image : (image?.url ?? '');

      return `
        <img
          data-testid="strapi-image"
          data-src="${src}"
          class="${className ?? ''}"
        />
      `;
    },
  },
}));

describe('ImageWrapper', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders StrapiImage with string src', async () => {
    const html = await container.renderToString(ImageWrapper, {
      props: {
        src: '/image.jpg',
      },
    });

    expect(html).toContain('data-testid="strapi-image"');
    expect(html).toContain('data-src="/image.jpg"');
  });
});
