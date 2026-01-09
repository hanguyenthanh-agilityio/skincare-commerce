// LanguageSwitcher.tsx

import type { Locale } from '@/types';
import { RadioDropdown } from '@/components';

interface Props {
  pathname: string; // e.g. "/en/", "/en/products", "/vi/about"
  locale: Locale; // 'en' | 'vi'
}

const LanguageSwitcher = ({ pathname, locale }: Props) => {
  const options: Record<Locale, string> = {
    en: 'EN',
    vi: 'VI',
  };

  const buildPath = (targetLocale: Locale) => {
    const { search, hash } = window.location;
    const segments = pathname.split('/').filter(Boolean);
    const newSegments = [targetLocale, ...segments.slice(1)];
    let newPath = `/${newSegments.join('/')}`;
    if (newSegments.length === 1) {
      newPath += '/';
    }
    return `${newPath}${search}${hash}`;
  };

  const handleLanguageChange = (lang: Locale) => {
    if (lang === locale) return;
    window.location.href = buildPath(lang);
  };

  return (
    <RadioDropdown<Locale>
      value={locale}
      options={options}
      values={['en', 'vi']}
      onChange={handleLanguageChange}
      className="text-destructive-foreground text-xs md:text-sm"
    />
  );
};

export default LanguageSwitcher;
