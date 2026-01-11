import { useMemo, useState } from 'react';

// Components
import { CartSummary, CartTable, HeadingWrapper, TypographyWrapper } from '@/components';

// UIs
import { Button } from '@/ui';

// Types
import type { CartColumn, CartContent, CartItem } from '@/types';
// Utils
import { getCartTotal } from '@/utils';

// Services
import { updateCartQuantity } from '@/services';

interface Props {
  content: CartContent;
  items: CartItem[];
}

const CartInfo = ({ content, items }: Props) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(items);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleQuantityChange = async (id: string, quantity: number) => {
    const prev = cartItems;

    // Optimistic UI
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity } : item)));

    setUpdatingId(id);

    try {
      // Persist to Strapi
      await updateCartQuantity({
        cartDocumentId: id,
        quantity,
      });
    } catch (error) {
      // Rollback if fail
      setCartItems(prev);
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const total = useMemo(() => getCartTotal(cartItems), [cartItems]);

  const columns: CartColumn[] = [
    { key: 'product', title: content.columns.cart },
    { key: 'price', title: content.columns.price },
    { key: 'quantity', title: content.columns.quantity },
    { key: 'subtotal', title: content.columns.subtotal },
  ];

  if (items.length === 0)
    <div className="flex flex-col items-center justify-center gap-5">
      <TypographyWrapper level="p" title={content.empty.title} />
      <Button>{content.empty.action}</Button>
    </div>;

  return (
    <section aria-labelledby="cart-heading" className="container-lg py-10 md:py-20 px-5">
      <header className="max-w-411 mb-12 mx-auto text-center">
        <HeadingWrapper level="h2" className="mb-2" title={content.title} />
        <TypographyWrapper level="p" title={content.description} />
      </header>

      <div className="flex flex-col">
        <CartTable
          columns={columns}
          items={cartItems}
          onQuantityChange={handleQuantityChange}
          updatingId={updatingId}
        />

        <div className="flex justify-end py-10">
          <CartSummary
            total={total.toString()}
            label={content.summary.totalLabel}
            shippingNote={content.summary.shippingNote}
            checkoutText={content.summary.checkout}
          />
        </div>
      </div>
    </section>
  );
};

export default CartInfo;
