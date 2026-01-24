/// <reference types="astro/client" />

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';

import ReviewSummary from '../index.astro';

/* ------------------------------------------------------------------
 * MOCK UI (Icons + Button)
 * ------------------------------------------------------------------ */
vi.mock('@/ui', () => ({
  Button: '<button data-testid="button"></button>',
  Icons: {
    Arrow: '<svg data-testid="arrow-icon"></svg>',
    Star: '<svg data-testid="star-icon"></svg>',
  },
}));

describe('ReviewSummary', () => {
  let container: Awaited<ReturnType<typeof AstroContainer.create>>;

  beforeAll(async () => {
    container = await AstroContainer.create();
  });

  it('renders title, average rating and total reviews', async () => {
    const html = await container.renderToString(ReviewSummary, {
      props: {
        labels: {
          title: 'Customer Reviews',
          totalReviews: '{count} reviews',
          ctaLabel: 'Write a review',
        },
        average: 4.6,
        totalReviews: 120,
        breakdown: [],
      },
    });

    expect(html).toContain('Customer Reviews');
    expect(html).toContain('4.6/5');
    expect(html).toContain('120 reviews');
  });

  it.skip('renders rating stars based on rounded average', async () => {
    const html = await container.renderToString(ReviewSummary, {
      props: {
        labels: {
          title: 'Reviews',
          totalReviews: '{count} reviews',
          ctaLabel: 'Write a review',
        },
        average: 4.2,
        totalReviews: 10,
        breakdown: [],
      },
    });

    // Rating uses Icons.Star internally
    const stars = html.match(/data-testid="star-icon"/g) ?? [];
    expect(stars.length).toBeGreaterThan(0);
  });

  it('renders breakdown rows', async () => {
    const html = await container.renderToString(ReviewSummary, {
      props: {
        labels: {
          title: 'Reviews',
          totalReviews: '{count} reviews',
          ctaLabel: 'Write a review',
        },
        average: 5,
        totalReviews: 5,
        breakdown: [
          { stars: [1, 2, 3, 4, 5], percentage: 60 },
          { stars: [1, 2, 3, 4], percentage: 40 },
        ],
      },
    });

    expect(html).toContain('60%');
    expect(html).toContain('40%');
  });

  it.skip('renders CTA button with arrow icon', async () => {
    const html = await container.renderToString(ReviewSummary, {
      props: {
        labels: {
          title: 'Reviews',
          totalReviews: '{count} reviews',
          ctaLabel: 'Write a review',
        },
        average: 5,
        totalReviews: 1,
        breakdown: [],
      },
    });

    expect(html).toContain('Write a review');
    expect(html).toContain('data-testid="button"');
    expect(html).toContain('data-testid="arrow-icon"');
  });
});
