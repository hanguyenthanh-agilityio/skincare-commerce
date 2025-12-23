// Types
import type { Locale } from '@/types';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  pathname: string;
}

const LanguageSwitcher = ({ pathname }: Props) => {
  const isVi = pathname.startsWith('/vi');

  const current: Locale = isVi ? 'vi' : 'en';

  const switchToEn = isVi ? pathname.replace('/vi', '') || '/' : pathname;
  const switchToVi = isVi ? pathname : `/vi${pathname}`;

  const options: Record<Locale, string> = {
    en: 'EN',
    vi: 'VI',
  };

  const paths: Record<Locale, string> = {
    en: switchToEn,
    vi: switchToVi,
  };

  const handleLanguageChange = (lang: Locale) => {
    window.location.href = paths[lang];
  };

  return (
    <RadioDropdown<Locale>
      value={current}
      options={options}
      values={['en', 'vi']}
      onChange={handleLanguageChange}
      className="text-destructive-foreground text-xs md:text-sm"
    />
  );
};

export default LanguageSwitcher;
