import type { CategoryContent, CategoryValue, Locale } from '@/types';

// Utils
import { updateQueryParam } from '@/utils';

// Constants
import { CATEGORY_VALUES, EMPTY_LABEL } from '@/constants';

// Components
import { RadioDropdown } from '@/components';

interface Props {
  content: CategoryContent;
  value: CategoryValue;
  locale: Locale;
  className?: string;
}

const CategoryFilter = ({ content, value, locale, className }: Props) => {
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
      emptyLabel={EMPTY_LABEL[locale]}
      onChange={handleChange}
      className={className}
    />
  );
};

export default CategoryFilter;
