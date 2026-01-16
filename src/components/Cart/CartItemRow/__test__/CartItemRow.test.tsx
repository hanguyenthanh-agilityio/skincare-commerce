/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { vi } from 'vitest';

// Mocks
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

vi.mock('@/utils', () => ({
  getCartItemSubtotal: vi.fn(),
}));

import { getCartItemSubtotal } from '@/utils';
import { CartItemRow } from '@/components';

// Test data
const mockItem = {
  id: 'cart-1',
  name: 'Cleanser',
  volume: '100ml',
  price: 20,
  quantity: 2,
  image: { url: '/image.png' },
} as any;

describe('CartItemRow', () => {
  beforeEach(() => {
    vi.mocked(getCartItemSubtotal).mockReturnValue(40);
  });

  it('renders product information correctly', () => {
    render(<CartItemRow item={mockItem} onQuantityChange={vi.fn()} />);

    expect(screen.getByText('Cleanser')).toBeInTheDocument();
    expect(screen.getByText('100ml')).toBeInTheDocument();
    expect(screen.getAllByText('$20').length).toBeGreaterThan(0);
  });

  it('renders subtotal correctly', () => {
    render(<CartItemRow item={mockItem} onQuantityChange={vi.fn()} />);

    expect(screen.getByText('$40')).toBeInTheDocument();
    expect(getCartItemSubtotal).toHaveBeenCalledWith(mockItem);
  });

  it('renders quantity input with correct value', () => {
    render(<CartItemRow item={mockItem} onQuantityChange={vi.fn()} />);

    const input = screen.getByRole('spinbutton') as HTMLInputElement;

    expect(input.value).toBe('2');
  });

  it('calls onQuantityChange with correct params when quantity changes', () => {
    const onQuantityChange = vi.fn();

    render(<CartItemRow item={mockItem} onQuantityChange={onQuantityChange} />);

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

    render(<CartItemRow item={itemWithoutVolume} onQuantityChange={vi.fn()} />);

    // Should NOT render "undefined" or "null"
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
    expect(screen.queryByText('null')).not.toBeInTheDocument();
  });
});
