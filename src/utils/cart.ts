import type { CartItem } from '@/types';

export const getCartItemSubtotal = (item: CartItem) => item.price * item.quantity;

export const getCartTotal = (items: CartItem[] = []) => {
  return items.reduce((total, item) => {
    return total + getCartItemSubtotal(item);
  }, 0);
};
