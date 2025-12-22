// Icons
import { CreditCard, Leaf, Mail, Monitor, ShoppingBag, Truck, MapPin, Phone } from 'lucide-react';

// Types
import type { SvgIcon } from '@/types';

// Faq Icon
const iconsMap: Record<string, SvgIcon> = {
  products: ShoppingBag,
  orders: Truck,
  payment: CreditCard,
  website: Monitor,
  sustainability: Leaf,
};

// Contact icons
export const contactIcons: Record<string, SvgIcon> = {
  phone: Phone,
  email: Mail,
  address: MapPin,
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

export function getContactIcon(contactId: string): SvgIcon {
  const Icon = contactIcons[contactId];
  if (!Icon) throw new Error(`No icon defined for contactId: ${contactId}`);
  return Icon;
}
