import { describe, it, expect } from 'vitest';

// Types
import type { Review } from '@/types';

// Utils
import { getRatingBreakdown } from '../review';

const createReview = (rating: number): Review => ({
  rating,
  comment: 'test',
  date: new Date().toISOString(),
});

describe('getRatingBreakdown', () => {
  it('should use default maxRating = 5', () => {
    const reviews = [createReview(5), createReview(4)];

    const result = getRatingBreakdown(reviews);

    expect(result.map((r) => r.stars[0])).toEqual([5, 4, 3, 2, 1]);
  });

  it('should respect provided maxRating', () => {
    const reviews = [createReview(10), createReview(7)];

    const result = getRatingBreakdown(reviews, 10);

    expect(result.map((r) => r.stars[0])).toEqual([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]);
  });

  it('should generate correct stars arrays for each row', () => {
    const reviews = [createReview(3)];

    const result = getRatingBreakdown(reviews, 3);

    expect(result[0].stars).toEqual([3, 2, 1]);
    expect(result[1].stars).toEqual([2, 1]);
    expect(result[2].stars).toEqual([1]);
  });

  it('should calculate correct percentages', () => {
    const reviews = [
      createReview(5),
      createReview(5),
      createReview(4),
      createReview(3),
      createReview(3),
    ];

    const result = getRatingBreakdown(reviews);

    expect(result).toEqual([
      { stars: [5, 4, 3, 2, 1], percentage: 40 },
      { stars: [4, 3, 2, 1], percentage: 20 },
      { stars: [3, 2, 1], percentage: 40 },
      { stars: [2, 1], percentage: 0 },
      { stars: [1], percentage: 0 },
    ]);
  });

  it('should return zero percentages when no reviews', () => {
    const result = getRatingBreakdown([], 3);

    expect(result).toEqual([
      { stars: [3, 2, 1], percentage: 0 },
      { stars: [2, 1], percentage: 0 },
      { stars: [1], percentage: 0 },
    ]);
  });

  it('should return empty array when maxRating is invalid', () => {
    const reviews = [createReview(1)];

    expect(getRatingBreakdown(reviews, 0)).toEqual([]);
    expect(getRatingBreakdown(reviews, -3)).toEqual([]);
  });
});
