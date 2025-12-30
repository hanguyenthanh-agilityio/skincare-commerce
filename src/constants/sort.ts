import type { CategoryValue, SkinTypeValue, SortValue } from '@/types';

export const SORT_VALUES: SortValue[] = ['price_desc', 'price_asc', 'newest', 'popularity'];

export const CATEGORY_VALUES: CategoryValue[] = [
  'cleanse',
  'exfoliate',
  'treat-masque',
  'suncare',
  'toner',
  'shave',
  'hydrate',
  'eyes-lips',
];

export const SKIN_TYPE_VALUES: SkinTypeValue[] = [
  'normal',
  'dry',
  'oily',
  'combination',
  'sensitive',
  'mature',
];
