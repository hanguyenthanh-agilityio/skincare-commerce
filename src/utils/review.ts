import type { Review, RatingBreakdown } from '@/types';

export function getRatingBreakdown(reviews: Review[]): RatingBreakdown[] {
  const total = reviews.length || 1;

  return ([5, 4, 3, 2, 1] as const).map((stars) => {
    const count = reviews.filter((r) => r.rating === stars).length;

    return {
      stars,
      percentage: Math.round((count / total) * 100),
    };
  });
}
