import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Component
import { Typography } from '@/components';

const container = await AstroContainer.create();

describe('Typography component', () => {
  it('renders h1 with correct default styles and title', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'Big Title',
        level: 'h1' as const,
      },
    });

    expect(result).toContain('Big Title');
    expect(result).toMatch(/<h1[^>]*>/);
    expect(result).toContain('text-destructive-foreground text-4xl/10');
  });

  it('renders h2 (default level fallback works when not provided)', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'Section',
        level: 'h2' as const,
      },
    });

    expect(result).toMatch(/<h2[^>]*>/);
    expect(result).toContain('text-destructive-foreground text-3xl/10');
  });

  it('applies custom className alongside default styles', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'Custom Styled',
        level: 'h3' as const,
        className: 'underline mt-8',
      },
    });

    expect(result).toMatch(/<h3[^>]*>/);
    expect(result).toContain('text-xl/8 font-medium underline mt-8');
  });

  it('applies custom className alongside default styles', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'Custom Styled',
        level: 'h3' as const,
        className: 'underline mt-8',
      },
    });

    expect(result).toMatch(/<h3[^>]*>/);
    expect(result).toContain('text-xl/8 font-medium underline mt-8');
  });

  it('renders <p> with correct classes', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'This is a paragraph',
        level: 'p' as const,
      },
    });

    expect(result).toContain('This is a paragraph');
    expect(result.trim()).toMatch(/^<p /);
    expect(result).toContain('text-destructive-foreground text-base/7');
  });

  it('renders <span> with correct classes', async () => {
    const result = await container.renderToString(Typography, {
      props: {
        title: 'Inline text',
        level: 'span' as const,
      },
    });

    expect(result).toContain('Inline text');
    expect(result.trim()).toMatch(/^<span /);
    expect(result).toContain('text-destructive-foreground text-sm/6');
  });

  it('supports all Typography levels h1–h6', async () => {
    const levels: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'> = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'p',
      'span',
    ];

    for (const level of levels) {
      const result = await container.renderToString(Typography, {
        props: {
          title: `Level ${level}`,
          level,
        },
      });

      expect(result).toContain(`Level ${level}`);
      expect(result).toMatch(new RegExp(`<${level}[^>]*>`));
    }
  });
});
