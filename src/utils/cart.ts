import type { CartItem } from '@/types';

export const calculateCartItemTotal = (item: CartItem) => item.price * item.quantity;

export const calculateCartTotalPrice = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + calculateCartItemTotal(item), 0);
