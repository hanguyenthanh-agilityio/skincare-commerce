/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import UserVoiceGrid from '../index.astro';

vi.mock('@/components', () => ({
  UserVoiceItem: '<div data-testid="user-voice-item"></div>',
}));

vi.mock('@/constants', () => ({
  USER_VOICE_DATA: [
    { src: '/img-1.jpg', link: 'https://ig.com/1' },
    { src: '/img-2.jpg', link: 'https://ig.com/2' },
    { src: '/img-3.jpg', link: 'https://ig.com/3' },
  ],
}));

describe('UserVoiceGrid', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it.skip('renders user voice items based on USER_VOICE_DATA', async () => {
    const html = await container.renderToString(UserVoiceGrid);

    const items = html.match(/data-testid="user-voice-item"/g) ?? [];

    expect(items.length).toBe(3);
  });

  it('renders grid layout container', async () => {
    const html = await container.renderToString(UserVoiceGrid);

    expect(html).toContain('grid');
    expect(html).toContain('grid-cols-3');
  });
});
