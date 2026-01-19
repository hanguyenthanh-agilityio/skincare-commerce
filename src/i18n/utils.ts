// Constants
import { LOCALES } from '@/constants';

// Types
import type { Locale } from '@/types';

export const buildRoute = (
  path: string,
  locale: Locale,
  params: Record<string, string> = {},
): string => {
  let resolvedPath = path;

  Object.entries(params).forEach(([key, value]) => {
    resolvedPath = resolvedPath.replace(`:${key}`, value);
  });

  // Ensure path starts without leading slash
  const normalizedPath = resolvedPath.startsWith('/') ? resolvedPath.slice(1) : resolvedPath;

  return `/${locale}/${normalizedPath}`;
};

export const getAllLocales = (): Locale[] => {
  return [...LOCALES];
};
