import type { BreadcrumbItem, ProductContext } from '@/types';
import { buildHref, formatLabel } from '@/utils';

const LABEL_MAP = {
  category: 'Category',
  skinType: 'Skin Type',
};

export function buildProductBreadcrumb(context?: ProductContext): BreadcrumbItem[] {
  if (!context) return [];

  return [
    { label: LABEL_MAP[context.type] },
    {
      label: formatLabel(context.value),
      href: buildHref(context),
    },
  ];
}
