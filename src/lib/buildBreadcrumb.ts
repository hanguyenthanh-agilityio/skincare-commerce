// Types
import type { BreadcrumbItem, ProductContext } from '@/types';

// Utils
import { buildHref, formatLabel } from '@/utils';

const LABEL_MAP = {
  category: 'Category',
  skinType: 'Skin Type',
};

// converts a product’s context into a breadcrumb structure that the UI can render
export const buildProductBreadcrumb = (context?: ProductContext): BreadcrumbItem[] => {
  if (!context) return [];

  return [
    { label: LABEL_MAP[context.type] },
    {
      label: formatLabel(context.value),
      href: buildHref(context),
    },
  ];
};
