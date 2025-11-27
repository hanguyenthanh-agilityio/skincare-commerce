/* eslint-disable @typescript-eslint/no-explicit-any */
import { messages, type Locale } from './messages';

export function t(locale: Locale, path: string, fallback: Locale = 'en'): string {
  const keys = path.split('.');
  let obj: any = messages[locale];

  for (const key of keys) {
    if (obj && key in obj) obj = obj[key];
    else {
      obj = messages[fallback];
      for (const key of keys) obj = obj[key];
      return obj || path;
    }
  }

  return obj;
}
