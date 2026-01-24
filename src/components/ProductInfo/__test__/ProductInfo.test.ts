/// <reference types="astro/client" />

import { describe, it, expect, beforeAll } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import ProductInfo from '../index.astro';

describe('ProductInfo', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders product title, description and price', async () => {
    const html = await container.renderToString(ProductInfo, {
      props: {
        locale: 'en',
        product: {
          documentId: 'prod-1',
          name: 'Hydrating Serum',
          description: 'Deep hydration for dry skin',
          price: 49,
        },
        attributes: [],
      },
    });

    expect(html).toContain('Hydrating Serum');
    expect(html).toContain('Deep hydration for dry skin');
    expect(html).toContain('$49');
  });

  it('renders product attributes correctly', async () => {
    const html = await container.renderToString(ProductInfo, {
      props: {
        locale: 'en',
        product: {
          documentId: 'prod-1',
          name: 'Cleanser',
          price: 19,
        },
        attributes: [
          { label: 'Skin Type', value: 'All skin types' },
          { label: 'Volume', value: '150ml' },
        ],
      },
    });

    expect(html).toContain('Skin Type');
    expect(html).toContain('All skin types');
    expect(html).toContain('Volume');
    expect(html).toContain('150ml');
  });

  it('does not render description if missing', async () => {
    const html = await container.renderToString(ProductInfo, {
      props: {
        locale: 'en',
        product: {
          documentId: 'prod-2',
          name: 'Foam Cleanser',
          price: 25,
        },
        attributes: [],
      },
    });

    expect(html).not.toContain('leading-relaxed');
  });
});
