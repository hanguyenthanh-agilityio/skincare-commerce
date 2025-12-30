import type { CartItem } from '@/types';

export const getCartItemSubtotal = (item: CartItem) => item.price * item.quantity;

export const getCartTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + getCartItemSubtotal(item), 0);
