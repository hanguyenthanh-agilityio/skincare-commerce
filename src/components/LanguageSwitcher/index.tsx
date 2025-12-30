// Types
import type { Locale } from '@/types';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  pathname: string;
  locale: Locale;
}

const LanguageSwitcher = ({ pathname, locale }: Props) => {
  const options: Record<Locale, string> = {
    en: 'EN',
    vi: 'VI',
  };

  const buildPath = (targetLocale: Locale) => {
    const { search, hash } = window.location;

    if (targetLocale === 'vi') {
      return pathname.startsWith('/vi')
        ? `${pathname}${search}${hash}`
        : `/vi${pathname}${search}${hash}`;
    }

    // EN
    const enPath = pathname.startsWith('/vi') ? pathname.replace(/^\/vi/, '') || '/' : pathname;

    return `${enPath}${search}${hash}`;
  };

  const handleLanguageChange = (lang: Locale) => {
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
