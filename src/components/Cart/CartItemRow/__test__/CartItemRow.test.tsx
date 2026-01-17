/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { vi } from 'vitest';

// Utils
import { calculateCartItemTotal } from '@/utils';

// Types
import type { CartItem } from '@/types';

// Components
import { CartItemRow } from '@/components';

// Mocks
vi.mock('@/utils', () => ({
  getCartItemSubtotal: vi.fn(),
}));

vi.mock('@/components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components')>();

  return {
    ...actual,

    TypographyWrapper: ({ title }: { title: string }) => <span>{title}</span>,
    StrapiImage: () => <img alt="product-image" />,
    QuantityInput: ({ value, onChange }: any) => (
      <input
        type="number"
        aria-label="quantity-input"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    ),
  };
});

// Test data
const mockItem: CartItem = {
  documentId: 'cart-1',
  name: 'Cleanser',
  volume: '100ml',
  price: 20,
  quantity: 2,
  image: { url: '/image.png', alternativeText: 'Cleanser' },
};

describe('CartItemRow', () => {
  beforeEach(() => {
    vi.mocked(calculateCartItemTotal).mockReturnValue(40);
  });

  it('renders product information correctly', () => {
    render(<CartItemRow cartItem={mockItem} onQuantityChange={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('Cleanser')).toBeInTheDocument();
    expect(screen.getByText('100ml')).toBeInTheDocument();
    expect(screen.getAllByText('$20').length).toBeGreaterThan(0);
  });

  it('renders subtotal correctly', () => {
    render(<CartItemRow cartItem={mockItem} onQuantityChange={vi.fn()} onDelete={vi.fn()} />);

    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(calculateCartItemTotal).toHaveBeenCalledWith(mockItem);
  });

  it('renders quantity input with correct value', () => {
    render(<CartItemRow cartItem={mockItem} onQuantityChange={vi.fn()} onDelete={vi.fn()} />);

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    expect(input.value).toBe('2');
  });

  it('calls onQuantityChange with correct params when quantity changes', () => {
    const onQuantityChange = vi.fn();

    render(
      <CartItemRow cartItem={mockItem} onQuantityChange={onQuantityChange} onDelete={vi.fn()} />,
    );

    fireEvent.change(screen.getByRole('spinbutton'), {
      target: { value: '3' },
    });

    expect(onQuantityChange).toHaveBeenCalledWith('cart-1', 3);
  });

  it('does not render volume text when volume is undefined', () => {
    const itemWithoutVolume = {
      ...mockItem,
      volume: undefined,
    };

    render(
      <CartItemRow cartItem={itemWithoutVolume} onQuantityChange={vi.fn()} onDelete={vi.fn()} />,
    );

    // Should NOT render "undefined" or "null"
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });
});
