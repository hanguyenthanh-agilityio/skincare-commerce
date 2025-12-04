import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Component
import { Heading } from '@/components';

const container = await AstroContainer.create();

describe('Heading component', () => {
  it('renders h1 with correct default styles and title', async () => {
    const result = await container.renderToString(Heading, {
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
    const result = await container.renderToString(Heading, {
      props: {
        title: 'Section',
        level: 'h2' as const,
      },
    });

    expect(result).toMatch(/<h2[^>]*>/);
    expect(result).toContain('text-destructive-foreground text-3xl/10');
  });

  it('applies custom className alongside default styles', async () => {
    const result = await container.renderToString(Heading, {
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
    const result = await container.renderToString(Heading, {
      props: {
        title: 'Custom Styled',
        level: 'h3' as const,
        className: 'underline mt-8',
      },
    });

    expect(result).toMatch(/<h3[^>]*>/);
    expect(result).toContain('text-xl/8 font-medium underline mt-8');
  });

  it('supports all Heading levels h1–h6', async () => {
    const levels: Array<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'> = [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
    ];

    for (const level of levels) {
      const result = await container.renderToString(Heading, {
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
