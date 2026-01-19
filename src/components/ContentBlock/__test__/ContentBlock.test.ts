import { describe, it, expect, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { ContentBlock } from '@/components';
import React from 'react';

vi.mock('@/ui', () => ({
  Icons: {
    Arrow: () =>
      React.createElement('svg', {
        'data-testid': 'arrow-icon',
      }),
  },
}));

const container = await AstroContainer.create();

describe('ContentBlock component', () => {
  it('renders title always', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: { title: 'Main Title' },
    });

    expect(result).toContain('Main Title');
    expect(result).toMatch(/<h2[^>]*>/);
  });

  it('renders subtitle when provided', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: {
        title: 'Main Title',
        subTitle: 'Sub Title',
      },
    });

    expect(result).toContain('Sub Title');
    expect(result).toContain('tracking-wide');
  });

  it('does not render subtitle when not provided', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: { title: 'Main Title' },
    });

    expect(result).not.toContain('tracking-wide');
  });

  it('renders description when provided', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: {
        title: 'Main Title',
        description: 'This is description',
      },
    });

    expect(result).toContain('This is description');
    expect(result).toContain('max-w-lg');
  });

  it('applies left alignment by default', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: { title: 'Left aligned' },
    });

    expect(result).toContain('text-left items-start');
  });

  it('applies center alignment when align="center"', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: {
        title: 'Center aligned',
        align: 'center',
      },
    });

    expect(result).toContain('text-center items-center');
  });

  it('uses dark color scheme by default', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: { title: 'Dark Scheme' },
    });

    expect(result).toContain('text-primary');
  });

  it('merges custom className with default wrapper classes', async () => {
    const result = await container.renderToString(ContentBlock, {
      props: {
        title: 'Custom Class',
        className: 'mt-10 border',
      },
    });

    expect(result).toContain('flex flex-col gap-4');
    expect(result).toContain('mt-10 border');
  });
});
