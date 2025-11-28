import { describe, it, expect } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

// Components
import { Heading2, Heading3, Heading4, Heading5, Heading6, NormalBlock } from '@/components/Blocks';

describe('Blocks component', () => {
  it('Heading 2 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading2, {
      slots: {
        default: 'This is a Heading 2',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a Heading 2');
  });

  it('Heading 3 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading3, {
      slots: {
        default: 'This is a Heading 3',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a Heading 3');
  });

  it('Heading 4 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading4, {
      slots: {
        default: 'This is a Heading 4',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a Heading 4');
  });

  it('Heading 5 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading5, {
      slots: {
        default: 'This is a Heading 5',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a Heading 5');
  });

  it('Heading 6 with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Heading6, {
      slots: {
        default: 'This is a Heading 6',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a Heading 6');
  });

  it('Normal Block with slots', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(NormalBlock, {
      slots: {
        default: 'This is a paragraph',
      },
    });

    expect(result).not.toContain('This is a card');
    expect(result).toContain('This is a paragraph');
  });
});
