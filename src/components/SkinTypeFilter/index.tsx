// Constants
import { SKIN_TYPE_VALUES } from '@/constants';

// Types
import type { SkinTypeContent, SkinTypeValue } from '@/types';

// Utils
import { updateQueryParam } from '@/utils';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  content: SkinTypeContent;
  value: SkinTypeValue;
  className?: string;
}

const SkinTypeFilter = ({ content, value, className }: Props) => {
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
      onChange={handleChange}
      className={className}
    />
  );
};

export default SkinTypeFilter;
