import { describe, it, expect } from 'vitest';

// Types
import type { CartItem } from '@/types';

// Utils
import { calculateCartTotalPrice, calculateCartItemTotal } from '../cart';

// Mocks
import { MOCK_PRODUCTS } from '@/mocks';

const mockItem = (overrides?: Partial<CartItem>): CartItem => ({
  documentId: '1',
  quantity: 2,
  product: MOCK_PRODUCTS[0],
  ...overrides,
});

describe('getCartItemSubtotal util', () => {
  it('should return price × quantity', () => {
    const item = mockItem({ product: MOCK_PRODUCTS[0], quantity: 3 });

    const result = calculateCartItemTotal(item);

    expect(result).toBe(300);
  });

  it('should return 0 when quantity is 0', () => {
    const item = mockItem({ quantity: 0 });

    const result = calculateCartItemTotal(item);

    expect(result).toBe(0);
  });

  it('should handle decimal prices', () => {
    const item = mockItem({ product: MOCK_PRODUCTS[0], quantity: 2 });

    const result = calculateCartItemTotal(item);

    expect(result).toBeCloseTo(200);
  });
});

describe('calculateCartTotalPrice util', () => {
  it('should return 0 when cart is empty', () => {
    expect(calculateCartTotalPrice([])).toBe(0);
  });

  it('should sum all cart item subtotals', () => {
    const items: CartItem[] = [
      mockItem({ documentId: '1', product: MOCK_PRODUCTS[0], quantity: 1 }), // 100
      mockItem({ documentId: '2', product: MOCK_PRODUCTS[0], quantity: 2 }), // 200
    ];

    const result = calculateCartTotalPrice(items);

    expect(result).toBe(300);
  });

  it('should handle cart with one item', () => {
    const items = [mockItem({ quantity: 4, product: MOCK_PRODUCTS[0] })]; // 400

    const result = calculateCartTotalPrice(items);

    expect(result).toBe(400);
  });
});
