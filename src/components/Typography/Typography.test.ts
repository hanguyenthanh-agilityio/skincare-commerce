import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Component
import { Typography } from '@/components';

const container = await AstroContainer.create();

describe('Typography component', () => {
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
});
