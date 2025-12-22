// Types
import type { SortContent, SortValue } from '@/types';

// Constants
import { SORT_VALUES } from '@/constants';

// Utils
import { updateQueryParam } from '@/utils';

// Components
import { RadioDropdown } from '@/components';

interface SortDropdownProps {
  content: SortContent;
  value: SortValue;
  className?: string;
}

const SortDropdown = ({ content, value, className }: SortDropdownProps) => {
  const { label, options } = content;

  const handleChange = (next: SortValue) => {
    if (next === value) {
      updateQueryParam('sort');
    } else {
      updateQueryParam('sort', next);
    }
  };

  return (
    <RadioDropdown<SortValue>
      label={label}
      value={value}
      options={options}
      values={SORT_VALUES}
      onChange={handleChange}
      className={className}
    />
  );
};

export default SortDropdown;
