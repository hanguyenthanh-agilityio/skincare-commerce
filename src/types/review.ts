import type { Locale } from './locale';

export interface RatingBreakdown {
  stars: number[];
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
