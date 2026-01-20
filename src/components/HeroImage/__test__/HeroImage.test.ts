import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, vi } from 'vitest';

import { HeroImage } from '@/components';

/* --------------------------------------------------
 * MOCKS
 * -------------------------------------------------- */


vi.mock('@/components', async (importOriginal) => {
    const actual = await importOriginal<typeof import('@/components')>();

    return {
        ...actual,
        StrapiImage: (props: any) => `
        <img data-testid="strapi-image-mock" />
      `,
    };
});

const container = await AstroContainer.create();

/* --------------------------------------------------
 * TESTS
 * -------------------------------------------------- */

describe('StrapiImageWrapper component', () => {
    it('renders wrapper div with base classes', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: 'image.jpg',
            },
        });

        expect(html).toContain('relative');
        expect(html).toContain('overflow-hidden');
        expect(html).toContain('w-full');
        expect(html).toContain('h-full');
    });

    it('merges custom className into wrapper', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: 'image.jpg',
                className: 'custom-class',
            },
        });

        expect(html).toContain('custom-class');
    });

    it('renders StrapiImage component', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: 'image.jpg',
            },
        });

        expect(html).toContain('data-testid="strapi-image-mock"');
    });

    it('passes src to StrapiImage as image prop', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: 'image.jpg',
            },
        });

        expect(html).toContain('"image.jpg"');
    });

    it('sets fallbackAspectRatio to 0', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: 'image.jpg',
            },
        });

        expect(html).toContain('data-fallback="0"');
    });

    it('handles null src without crashing', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: null,
            },
        });

        expect(html).toContain('data-testid="strapi-image-mock"');
    });

    it('handles undefined src without crashing', async () => {
        const html = await container.renderToString(HeroImage, {
            props: {
                src: undefined,
            },
        });

        expect(html).toContain('data-testid="strapi-image-mock"');
    });
});
