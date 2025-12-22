import type { CategoryContent, CategoryValue } from '@/types';

// Utils
import { updateQueryParam } from '@/utils';

// Constants
import { CATEGORY_VALUES } from '@/constants';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  content: CategoryContent;
  value: CategoryValue;
  className?: string;
}

const CategoryFilter = ({ content, value, className }: Props) => {
  const { label, options } = content;

  const handleChange = (next: CategoryValue) => {
    if (next === value) {
      updateQueryParam('category');
    } else {
      updateQueryParam('category', next);
    }
  };

  return (
    <RadioDropdown<CategoryValue>
      label={label}
      value={value}
      options={options}
      values={CATEGORY_VALUES}
      onChange={handleChange}
      className={className}
    />
  );
};

export default CategoryFilter;
