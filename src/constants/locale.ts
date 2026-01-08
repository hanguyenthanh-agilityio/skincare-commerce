export const LOCALES = ['en', 'vi'] as const;

export type Locale = (typeof LOCALES)[number];

export const isLocale = (value: string): value is Locale => value === 'en' || value === 'vi';

export const EMPTY_LABEL: Record<Locale, string> = {
  en: 'All',
  vi: 'Tất cả',
} as const;
