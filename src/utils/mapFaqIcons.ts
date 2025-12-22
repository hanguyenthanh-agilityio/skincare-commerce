// Icons
import { CreditCard, Leaf, Monitor, ShoppingBag, Truck } from 'lucide-react';

// Types
import type { SvgIcon } from '@/types';

const iconsMap: Record<string, SvgIcon> = {
  products: ShoppingBag,
  orders: Truck,
  payment: CreditCard,
  website: Monitor,
  sustainability: Leaf,
};

/**
 * Map FAQ topic id -> React icon
 */
export function getFaqIcon(topicId: string): SvgIcon {
  const Icon = iconsMap[topicId];
  if (!Icon) {
    throw new Error(`No icon defined for topicId: ${topicId}`);
  }
  return Icon;
}
