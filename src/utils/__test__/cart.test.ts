import { describe, it, expect } from 'vitest';

// Types
import type { CartItem } from '@/types';

// Utils
import { calculateCartTotalPrice, calculateCartItemTotal } from '../cart';

const mockItem = (overrides?: Partial<CartItem>): CartItem => ({
  documentId: '1',
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

    const result = calculateCartItemTotal(item);

    expect(result).toBe(150);
  });

  it('should return 0 when quantity is 0', () => {
    const item = mockItem({ quantity: 0 });

    const result = calculateCartItemTotal(item);

    expect(result).toBe(0);
  });

  it('should handle decimal prices', () => {
    const item = mockItem({ price: 19.99, quantity: 2 });

    const result = calculateCartItemTotal(item);

    expect(result).toBeCloseTo(39.98);
  });
});

describe('calculateCartTotalPrice util', () => {
  it('should return 0 when cart is empty', () => {
    expect(calculateCartTotalPrice([])).toBe(0);
  });

  it('should sum all cart item subtotals', () => {
    const items: CartItem[] = [
      mockItem({ documentId: '1', price: 100, quantity: 1 }), // 100
      mockItem({ documentId: '2', price: 50, quantity: 2 }), // 100
      mockItem({ documentId: '3', price: 20, quantity: 3 }), // 60
    ];

    const result = calculateCartTotalPrice(items);

    expect(result).toBe(260);
  });

  it('should handle cart with one item', () => {
    const items = [mockItem({ price: 99, quantity: 4 })];

    const result = calculateCartTotalPrice(items);

    expect(result).toBe(396);
  });
});
