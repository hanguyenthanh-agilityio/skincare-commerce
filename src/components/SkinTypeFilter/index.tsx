// Constants
import { EMPTY_LABEL, SKIN_TYPE_VALUES } from '@/constants';

// Types
import type { Locale, SkinTypeContent, SkinTypeValue } from '@/types';

// Utils
import { updateQueryParam } from '@/utils';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  content: SkinTypeContent;
  value: SkinTypeValue;
  locale: Locale;
  className?: string;
}

const SkinTypeFilter = ({ content, value, locale, className }: Props) => {
  const { label, options } = content;

  const handleChange = (next: SkinTypeValue) => {
    if (next === value) {
      updateQueryParam('skinType');
    } else {
      updateQueryParam('skinType', next);
    }
  };

  return (
    <RadioDropdown<SkinTypeValue>
      label={label}
      value={value}
      options={options}
      values={SKIN_TYPE_VALUES}
      emptyLabel={EMPTY_LABEL[locale]}
      onChange={handleChange}
      className={className}
    />
  );
};

export default SkinTypeFilter;
