import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect, vi } from 'vitest';

import { Rating } from '@/components';

vi.mock('@/ui', () => ({
    Icons: {
        Star: '<svg data-testid="star" aria-hidden="true"></svg>',
    },
}));

const container = await AstroContainer.create();

describe('Rating component', () => {
    it('renders wrapper with role="img" and correct aria-label', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 3, max: 5 },
        });

        expect(result).toContain('role="img"');
        expect(result).toContain('aria-label="Rating: 3 out of 5"');
    });

    it('renders filled stars for value', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 2, max: 5 },
        });

        const filled =
            (result.match(/text-destructive-foreground/g) || []).length;

        expect(filled).toBe(2);
    });

    it('renders empty stars for remaining slots', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 1, max: 5 },
        });

        const empty =
            (result.match(/text-quill-grey/g) || []).length;

        expect(empty).toBe(4);
    });

    it('applies small size classes by default', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 1 },
        });

        expect(result).toContain('h-4 w-4');
    });

    it('applies medium size classes when size="md"', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 1, size: 'md' },
        });

        expect(result).toContain('h-5 w-5');
    });

    it('marks all stars as aria-hidden', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 3 },
        });

        const hidden =
            (result.match(/aria-hidden="true"/g) || []).length;

        expect(hidden).toBe(5);
    });

    it('merges custom className into wrapper', async () => {
        const result = await container.renderToString(Rating, {
            props: { value: 3, className: 'mt-4' },
        });

        expect(result).toContain('mt-4');
    });
});
