import { LOCALES, ROUTER } from '@/constants';

// Types
import type { Locale } from '@/types';

export const buildRoute = (
  path: (typeof ROUTER)[keyof typeof ROUTER],
  lang: string,
  params: Record<string, string> = {},
) => {
  let finalPath = path;

  for (const [k, v] of Object.entries(params)) {
    finalPath = finalPath.replace(`:${k}`, v);
  }

  return `/${lang}/${finalPath}`;
};

export function getAllLocales(): Locale[] {
  return [...LOCALES];
}
