/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import UserActions from '../index.astro';

vi.mock('@/ui', () => ({
  Icons: {
    Cart: '<svg data-testid="cart-icon"></svg>',
    User: '<svg data-testid="user-icon"></svg>',
  },
  Button: '<button data-testid="button"><slot /></button>',
}));

vi.mock('@/components', () => ({
  Link: '<a href="#" data-testid="link"><slot /></a>',
}));

vi.mock('@/i18n', () => ({
  buildRoute: (path: string) => path,
  loadContent: () => ({
    login: {
      label: 'Login',
      ariaLabel: 'Login',
    },
    logout: {
      label: 'Logout',
    },
    cart: {
      ariaLabel: 'Cart',
    },
  }),
}));

describe('UserActions', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders cart icon', async () => {
    const html = await container.renderToString(UserActions, {
      props: { locale: 'en' },
    });

    expect(html).toContain('data-testid="cart-icon"');
  });

  it('renders login button when unauthenticated', async () => {
    const html = await container.renderToString(UserActions, {
      props: { locale: 'en' },
    });

    expect(html).toContain('Login');
    expect(html).toContain('aria-label="Login"');
  });
});
