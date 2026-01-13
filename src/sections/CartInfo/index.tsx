import { useMemo } from 'react';
import { Loader2 } from 'lucide-react';

// Components
import { CartSummary, CartTable, HeadingWrapper, TypographyWrapper } from '@/components';
import { Button } from '@/ui';

// Types
import type { CartContent, CartColumn } from '@/types';

// Hook
import { useCart } from '@/hooks';

interface Props {
  content: CartContent;
}

const CartInfo = ({ content }: Props) => {
  const { cartItems, total, isLoading, updatingId, error, updateQuantity, removeItem } = useCart();

  const columns: CartColumn[] = useMemo(
    () => [
      { key: 'product', title: content.columns.cart },
      { key: 'price', title: content.columns.price },
      { key: 'quantity', title: content.columns.quantity },
      { key: 'subtotal', title: content.columns.subtotal },
    ],
    [content.columns],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20" aria-busy="true">
        <Loader2 className="h-6 w-6 animate-spin text-gray-900" />
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20">
        <TypographyWrapper level="p" title={error ?? content.empty.title} />
        <Button>{content.empty.action}</Button>
      </div>
    );
  }

  return (
    <section aria-labelledby="cart-heading" className="container-lg py-10 md:py-20 px-5">
      <header className="max-w-411 mb-12 mx-auto text-center">
        <HeadingWrapper level="h2" className="mb-2" title={content.title} />
        <TypographyWrapper level="p" title={content.description} />
      </header>

      <CartTable
        columns={columns}
        items={cartItems}
        onQuantityChange={updateQuantity}
        onDelete={removeItem}
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
    </section>
  );
};

export default CartInfo;
