import { MenuLinks } from '@/components';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';

const container = await AstroContainer.create();

describe('MenuLink component', () => {
  const links = [
    { href: '/about', label: 'About' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  it('renders all navigation links', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: { links },
    });

    expect(result).toContain('About');
    expect(result).toContain('Products');
    expect(result).toContain('Contact');
  });

  it('renders correct href for each link', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: { links },
    });

    expect(result).toContain('href="/about"');
    expect(result).toContain('href="/products"');
    expect(result).toContain('href="/contact"');
  });

  it('wraps each link inside a list item', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: { links },
    });

    const liCount = (result.match(/<li\b/g) ?? []).length;
    expect(liCount).toBe(3);
  });

  it('applies className to the <ul> element', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: {
        links,
        className: 'flex gap-4',
      },
    });

    expect(result).toContain('<ul class="flex gap-4"');
  });

  it('merges textClass into Link className', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: {
        links,
        textClass: 'uppercase font-bold',
      },
    });

    expect(result).toContain('text-xs text-quill-grey uppercase font-bold');
  });

  it('renders empty list when links array is empty', async () => {
    const result = await container.renderToString(MenuLinks, {
      props: { links: [] },
    });

    expect(result).toMatch(/<ul[^>]*>\s*<\/ul>/);
  });
});
