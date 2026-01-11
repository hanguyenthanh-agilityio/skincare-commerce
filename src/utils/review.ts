import type { Review, RatingBreakdown } from '@/types';

export function getRatingBreakdown(reviews: Review[], maxRating = 5): RatingBreakdown[] {
  if (maxRating <= 0) return [];

  const total = reviews.length || 1;

  const starsRange = Array.from({ length: maxRating }, (_, i) => maxRating - i);

  return starsRange.map((starValue) => {
    const count = reviews.filter((r) => r.rating === starValue).length;

    return {
      stars: Array.from({ length: starValue }, (_, i) => starValue - i),
      percentage: Math.round((count / total) * 100),
    };
  });
}
