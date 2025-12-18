import type { ProductContext } from '@/types';

/**
 * Format a date value into a human-readable string.
 *
 * en → 18 August 2023
 * vi → 18 Tháng 8 2023
 *
 * @param value - A date value as a Date object or ISO date string
 * @param locale - Language locale ("en" | "vi")
 * @returns Localized formatted date string
 */
export const formatDate = (value: string | Date, locale: 'en' | 'vi' = 'en') => {
  const d = new Date(value);

  const localeMap: Record<'en' | 'vi', string> = {
    en: 'en-GB',
    vi: 'vi-VN',
  };

  return d.toLocaleDateString(localeMap[locale], {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

export const formatLabel = (value: string) => {
  return value.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase());
};

export const buildHref = (context: ProductContext) => {
  if (context.type === 'skinType') {
    return `/products/${context.value}-skin`;
  }

  return `/products/${context.value}`;
};
