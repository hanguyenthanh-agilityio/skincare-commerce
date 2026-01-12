import { describe, it, expect } from 'vitest';

// Types
import type { CartItem } from '@/types';

// Utils
import { getCartItemSubtotal, getCartTotal } from '../cart';

const mockItem = (overrides?: Partial<CartItem>): CartItem => ({
  id: '1',
  name: 'Cleanser',
  price: 100,
  quantity: 2,
  image: {
    url: 'img.png',
    alternativeText: null,
  },
  ...overrides,
});

describe('getCartItemSubtotal util', () => {
  it('should return price × quantity', () => {
    const item = mockItem({ price: 50, quantity: 3 });

    const result = getCartItemSubtotal(item);

    expect(result).toBe(150);
  });

  it('should return 0 when quantity is 0', () => {
    const item = mockItem({ quantity: 0 });

    const result = getCartItemSubtotal(item);

    expect(result).toBe(0);
  });

  it('should handle decimal prices', () => {
    const item = mockItem({ price: 19.99, quantity: 2 });

    const result = getCartItemSubtotal(item);

    expect(result).toBeCloseTo(39.98);
  });
});

describe('getCartTotal util', () => {
  it('should return 0 when cart is empty', () => {
    expect(getCartTotal([])).toBe(0);
  });

  it('should return 0 when no argument is passed', () => {
    expect(getCartTotal()).toBe(0);
  });

  it('should sum all cart item subtotals', () => {
    const items: CartItem[] = [
      mockItem({ price: 100, quantity: 1 }), // 100
      mockItem({ id: '2', price: 50, quantity: 2 }), // 100
      mockItem({ id: '3', price: 20, quantity: 3 }), // 60
    ];

    const result = getCartTotal(items);

    expect(result).toBe(260);
  });

  it('should handle cart with one item', () => {
    const items = [mockItem({ price: 99, quantity: 4 })];

    const result = getCartTotal(items);

    expect(result).toBe(396);
  });
});
