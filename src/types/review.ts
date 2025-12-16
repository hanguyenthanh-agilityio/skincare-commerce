import type { Locale } from './locale';

export interface RatingBreakdown {
  stars: 5 | 4 | 3 | 2 | 1;
  percentage: number;
}

export interface Labels {
  title: string;
  totalReviews: string;
  ctaLabel: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string | Date;
  locale?: Locale;
}
