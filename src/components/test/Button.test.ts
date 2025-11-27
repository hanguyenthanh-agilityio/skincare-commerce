import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';
import Button from '../Button.astro';

describe('Button.astro', () => {
  it('renders button with label', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Button, {
      props: { label: 'Click me' },
    });

    expect(result).toContain('Click me');
    expect(result).toContain('<button');
  });
});
