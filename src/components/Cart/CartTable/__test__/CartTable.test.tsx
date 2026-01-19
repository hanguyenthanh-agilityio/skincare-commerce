/* eslint-disable @typescript-eslint/no-explicit-any */
import { vi } from 'vitest';

vi.mock('@/components/Cart/CartHeaderRow', () => ({
  default: ({ columns }: { columns: { title: string }[] }) => (
    <div data-testid="cart-header">{columns.map((c) => c.title).join(',')}</div>
  ),
}));

vi.mock('@/components/Cart/CartItemRow', () => ({
  default: ({
    cartItem,
    onQuantityChange,
  }: {
    cartItem: {
      documentId: string;
      quantity: number;
      name: string;
    };
    onQuantityChange: (id: string, quantity: number) => void;
  }) => (
    <div
      data-testid="cart-item"
      onClick={() => onQuantityChange(cartItem.documentId, cartItem.quantity + 1)}
    >
      {cartItem.name}
    </div>
  ),
}));

import { render, screen, fireEvent } from '@testing-library/react';

import type { CartItem } from '@/types';
import { CartTable } from '@/components';

describe('CartTable', () => {
  const columns = [
    { title: 'Product' },
    { title: 'Price' },
    { title: 'Quantity' },
    { title: 'Subtotal' },
  ];

  const items: CartItem[] = [
    {
      documentId: '1',
      name: 'Cleanser',
      price: 20,
      quantity: 2,
      image: {} as any,
    },
    {
      documentId: '2',
      name: 'Toner',
      price: 15,
      quantity: 1,
      image: {} as any,
    },
  ];

  it('renders CartHeaderRow with correct columns', () => {
    render(
      <CartTable
        columns={columns}
        cartList={items}
        updatingId={null}
        onQuantityChange={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const header = screen.getByTestId('cart-header');
    expect(header).toBeInTheDocument();

    columns.forEach((col) => {
      expect(header).toHaveTextContent(col.title);
    });
  });

  it('renders one CartItemRow per item', () => {
    render(
      <CartTable
        columns={columns}
        cartList={items}
        updatingId={null}
        onQuantityChange={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    const rows = screen.getAllByTestId('cart-item');
    expect(rows).toHaveLength(items.length);
  });

  it('renders correct item names', () => {
    render(
      <CartTable
        columns={columns}
        cartList={items}
        updatingId={null}
        onQuantityChange={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.getByText('Cleanser')).toBeInTheDocument();
    expect(screen.getByText('Toner')).toBeInTheDocument();
  });

  it('forwards onQuantityChange to CartItemRow', () => {
    const onQuantityChange = vi.fn();

    render(
      <CartTable
        columns={columns}
        cartList={items}
        updatingId={null}
        onDelete={vi.fn()}
        onQuantityChange={onQuantityChange}
      />,
    );

    const firstRow = screen.getAllByTestId('cart-item')[0];

    fireEvent.click(firstRow);

    expect(onQuantityChange).toHaveBeenCalledWith(items[0].documentId, items[0].quantity + 1);
  });

  it('renders correctly with empty items', () => {
    render(
      <CartTable
        columns={columns}
        cartList={[]}
        updatingId={null}
        onQuantityChange={vi.fn()}
        onDelete={vi.fn()}
      />,
    );

    expect(screen.queryByTestId('cart-item')).not.toBeInTheDocument();
    expect(screen.getByTestId('cart-header')).toBeInTheDocument();
  });
});
