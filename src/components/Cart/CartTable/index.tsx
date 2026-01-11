// Components
import { CartHeaderRow, CartItemRow } from '@/components';

// Types
import type { CartItem } from '@/types';

interface Props {
  columns: {
    title: string;
    className?: string;
  }[];
  items: CartItem[];
  updatingId: string | null;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartTable = ({ columns, items, updatingId, onQuantityChange }: Props) => (
  <>
    <div className="hidden md:block">
      <CartHeaderRow columns={columns} />
    </div>

    {items.map((item) => (
      <CartItemRow
        key={item.id}
        item={item}
        onQuantityChange={onQuantityChange}
        disabled={updatingId === item.id}
      />
    ))}
  </>
);

export default CartTable;
