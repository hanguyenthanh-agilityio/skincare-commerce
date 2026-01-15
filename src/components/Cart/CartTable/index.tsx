// Components
import { CartHeaderRow, CartItemRow } from '@/components';

// Types
import type { CartItem } from '@/types';

interface Props {
  columns: {
    title: string;
    className?: string;
  }[];
  cartList: CartItem[];
  updatingId: string | null;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete: (documentId: string) => void;
}

const CartTable = ({ columns, cartList, updatingId, onQuantityChange, onDelete }: Props) => (
  <>
    <div className="hidden md:block">
      <CartHeaderRow columns={columns} />
    </div>

    {cartList.map((item) => (
      <CartItemRow
        key={item.documentId}
        cartItem={item}
        onQuantityChange={onQuantityChange}
        onDelete={onDelete}
        disabled={updatingId === item.documentId}
      />
    ))}
  </>
);

export default CartTable;
