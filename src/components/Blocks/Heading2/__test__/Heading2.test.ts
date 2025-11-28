import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { Heading2 } from '../..';

describe('Heading2 component', () => {
  it('Heading 2 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading2, {
      slots: {
        default: 'Heading 2 content',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('Heading 2 content');
  });
});
