import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as loader from '@/i18n/loader';

vi.mock('js-yaml', () => ({
    default: {
        load: vi.fn(),
    },
}));

describe('loadContent', () => {
    const locale = 'en';

    beforeEach(() => {
        vi.restoreAllMocks();
        Object.keys(loader.markdownFiles).forEach(
            (k) => delete loader.markdownFiles[k],
        );
    });

    it('should load markdown without frontmatter', () => {
        loader.markdownFiles['/src/content/home/en.md'] = 'Hello world';

        const result = loader.loadContent('home', locale);

        expect(result).toEqual({ body: 'Hello world' });
    });

    it('should ignore invalid frontmatter (missing end)', () => {
        loader.markdownFiles['/src/content/home/en.md'] = `---
title: Home
Content`;

        const result = loader.loadContent('home', locale);

        expect(result.body).toContain('---');
    });

    it('should parse valid frontmatter', async () => {
        const yaml = await import('js-yaml');
        (yaml.default.load as ReturnType<typeof vi.fn>).mockReturnValue({
            title: 'Home',
            seo: 'SEO title',
        });

        loader.markdownFiles['/src/content/home/en.md'] = `---
title: Home
seo: SEO title
---
Content body`;

        const result = loader.loadContent('home', locale);

        expect(result).toEqual({
            title: 'Home',
            seo: 'SEO title',
            body: 'Content body',
        });
    });

    it('should return empty data if yaml result is not object', async () => {
        const yaml = await import('js-yaml');
        (yaml.default.load as ReturnType<typeof vi.fn>).mockReturnValue('string');

        loader.markdownFiles['/src/content/home/en.md'] = `---
title: Home
---
Body`;

        const result = loader.loadContent('home', locale);

        expect(result).toEqual({ body: 'Body' });
    });

    it('should resolve fallback path with ./ prefix', () => {
        loader.markdownFiles['./src/content/home/en.md'] = 'Fallback content';

        const result = loader.loadContent('home', locale);

        expect(result.body).toBe('Fallback content');
    });

    it('should throw error when content file is missing', () => {
        expect(() =>
            loader.loadContent('missing', locale),
        ).toThrowError('Missing content file');
    });
});
