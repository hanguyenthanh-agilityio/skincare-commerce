/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import UserVoiceItem from '../index.astro';

vi.mock('@/ui', () => ({
  Icons: {
    Instagram: '<svg data-testid="instagram-icon" aria-hidden="true"></svg>',
  },
}));

describe('UserVoiceItem', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders image and instagram icon', async () => {
    const html = await container.renderToString(UserVoiceItem, {
      props: {
        src: '/img.jpg',
      },
    });

    // StrapiImage (mock sẵn)
    expect(html).toContain('data-testid="strapi-image"');

    // Instagram icon
    expect(html).toContain('data-testid="instagram-icon"');
  });

  it('renders link with provided href', async () => {
    const html = await container.renderToString(UserVoiceItem, {
      props: {
        src: '/img.jpg',
        link: 'https://instagram.com/post/1',
      },
    });

    expect(html).toContain('href="https://instagram.com/post/1"');
    expect(html).toContain('aria-label="View Instagram post"');
  });

  it('falls back to "#" when link is not provided', async () => {
    const html = await container.renderToString(UserVoiceItem, {
      props: {
        src: '/img.jpg',
      },
    });

    expect(html).toContain('href="#"');
  });
});
