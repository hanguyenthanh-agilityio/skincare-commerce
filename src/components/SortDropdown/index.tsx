// Types
import type { Locale, SortContent, SortValue } from '@/types';

// Constants
import { EMPTY_LABEL, SORT_VALUES } from '@/constants';

// Utils
import { updateQueryParam } from '@/utils';

// Components
import { RadioDropdown } from '@/components';

interface SortDropdownProps {
  content?: SortContent;
  value?: SortValue;
  locale: Locale;
  className?: string;
}

const SortDropdown = ({ content, value, locale, className }: SortDropdownProps) => {
  const handleChange = (next: SortValue) => {
    if (next === value) {
      updateQueryParam('sort');
    } else {
      updateQueryParam('sort', next);
    }
  };

  return (
    <RadioDropdown<SortValue>
      label={content?.label}
      value={value}
      options={content?.options}
      values={SORT_VALUES}
      emptyLabel={EMPTY_LABEL[locale]}
      onChange={handleChange}
      className={className}
    />
  );
};

export default SortDropdown;
