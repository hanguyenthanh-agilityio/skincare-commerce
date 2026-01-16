/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';

vi.mock('@/components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components')>();

  return {
    ...actual,
    CartHeaderRow: ({ columns }: any) => (
      <div data-testid="cart-header">{columns.map((col: any) => col.title).join(',')}</div>
    ),
    CartItemRow: ({ item }: any) => <div data-testid="cart-item">{item.name}</div>,
  };
});

import { render, screen } from '@testing-library/react';
import { CartTable } from '@/components';
import type { CartItem } from '@/types';

describe('CartTable', () => {
  const columns = [
    { title: 'Product' },
    { title: 'Price' },
    { title: 'Quantity' },
    { title: 'Subtotal' },
  ];

  const items: CartItem[] = [
    {
      id: '1',
      name: 'Cleanser',
      price: 20,
      quantity: 2,
      image: {} as any,
    },
    {
      id: '2',
      name: 'Toner',
      price: 15,
      quantity: 1,
      image: {} as any,
    },
  ];

  const onQuantityChange = vi.fn();

  it('renders CartHeaderRow with correct columns', () => {
    render(<CartTable columns={columns} items={items} onQuantityChange={onQuantityChange} />);

    const header = screen.getByTestId('cart-header');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('Product');
    expect(header).toHaveTextContent('Price');
    expect(header).toHaveTextContent('Quantity');
    expect(header).toHaveTextContent('Subtotal');
  });

  it('renders one CartItemRow per item', () => {
    render(<CartTable columns={columns} items={items} onQuantityChange={onQuantityChange} />);

    const rows = screen.getAllByTestId('cart-item');
    expect(rows).toHaveLength(items.length);
  });

  it('renders correct item data', () => {
    render(<CartTable columns={columns} items={items} onQuantityChange={onQuantityChange} />);

    expect(screen.getByText('Cleanser')).toBeInTheDocument();
    expect(screen.getByText('Toner')).toBeInTheDocument();
  });
});
