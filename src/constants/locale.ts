import type { Locale } from '@/types';

export const LOCALES = {
  VI: 'vi',
  EN: 'en',
} as const;

export const EMPTY_LABEL: Record<Locale, string> = {
  en: 'All',
  vi: 'Tất cả',
} as const;
