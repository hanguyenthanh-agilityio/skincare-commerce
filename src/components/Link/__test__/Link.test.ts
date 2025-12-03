import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Components
import { Link } from '@/components';

describe('Link component', () => {
  it('Link renders correctly with required href', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Link, {
      props: {
        href: '/about',
      },
      slots: {
        default: 'About Us',
      },
    });

    expect(result).toContain('href="/about"');
    expect(result).toContain('About Us');
    expect(result).toContain('text-destructive-foreground');
    expect(result).toContain('inline-flex items-center gap-2.5');
  });

  it('Link adds rel="noopener noreferrer" when target="_blank"', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Link, {
      props: {
        href: 'https://example.com',
        target: '_blank',
      },
      slots: {
        default: 'External Link',
      },
    });

    expect(result).toContain('target="_blank"');
    expect(result).toContain('External Link');
  });

  it('Link respects custom rel when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Link, {
      props: {
        href: 'https://example.com',
        target: '_blank',
        rel: 'nofollow',
      },
      slots: { default: 'No follow' },
    });

    expect(result).toContain('rel="nofollow"');
    expect(result).not.toContain('noopener noreferrer');
  });

  it('Link merges custom class and applies underline styles', async () => {
    const container = await AstroContainer.create();

    // underline="none"
    const none = await container.renderToString(Link, {
      props: {
        href: '/privacy',
        underline: 'none',
      },
      slots: { default: 'Privacy' },
    });
    expect(none).not.toContain('hover:underline');
  });

  it('Link passes aria-label and other attributes', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Link, {
      props: {
        href: '/delete',
        ariaLabel: 'Delete item',
        id: 'delete-link',
        'data-testid': 'delete',
      },
      slots: {
        default: '<svg>Trash</svg>',
      },
    });

    expect(result).toContain('aria-label="Delete item"');

    expect(result).toContain('<svg>Trash</svg>');
  });

  it('Link renders complex slot content with HTML', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(Link, {
      props: {
        href: 'https://github.com',
        target: '_blank',
      },
      slots: {
        default: `GitHub <span aria-hidden="true">→</span>`,
      },
    });

    expect(result).toContain('GitHub');
    expect(result).toContain('<span aria-hidden="true">→</span>');
  });
});
