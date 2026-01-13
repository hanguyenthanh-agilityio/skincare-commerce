import { useState, useEffect, useMemo, useCallback } from 'react';

// Components
import { CartSummary, CartTable, HeadingWrapper, TypographyWrapper } from '@/components';
import { Button } from '@/ui';

// Types
import type { CartContent, CartItem, CartColumn } from '@/types';

// Utils & Services
import { getCartTotal } from '@/utils';
import { getCartByUser, updateCartQuantity, deleteCartItem } from '@/services';
import { ERROR_MESSAGES } from '@/constants';

interface Props {
  content: CartContent;
}

const CartInfo = ({ content }: Props) => {
  const USER_DOCUMENT_ID = 'w9vowcg1y2rrph1h6eaiic7y';
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((message: string) => {
    setError(message);
  }, []);

  // Fetches cart items of the current user
  const fetchCart = useCallback(async () => {
    try {
      const items = await getCartByUser({ userDocumentId: USER_DOCUMENT_ID });
      setCartItems(items);
      setError(null);
    } catch {
      handleError(ERROR_MESSAGES.CART_FETCH_FAILED);
    }
  }, [USER_DOCUMENT_ID, handleError]);

  // Initial cart fetch when component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Cart total price
  const total = useMemo(() => getCartTotal(cartItems), [cartItems]);

  const columns: CartColumn[] = [
    { key: 'product', title: content.columns.cart },
    { key: 'price', title: content.columns.price },
    { key: 'quantity', title: content.columns.quantity },
    { key: 'subtotal', title: content.columns.subtotal },
  ];

  // Handles quantity change of a cart item
  const handleQuantityChange = useCallback(
    async (cartDocumentId: string, quantity: number) => {
      try {
        await updateCartQuantity({ cartDocumentId, quantity });
        await fetchCart();
      } catch {
        handleError(ERROR_MESSAGES.CART_UPDATE_FAILED);
      }
    },
    [fetchCart, handleError],
  );

  // Delete cart item
  const handleDelete = useCallback(
    async (cartId: string) => {
      try {
        await deleteCartItem(cartId);
        await fetchCart();
      } catch {
        handleError(ERROR_MESSAGES.CART_DELETE_FAILED);
      }
    },
    [fetchCart, handleError],
  );

  console.log('data:', cartItems);

  if (cartItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center gap-5 py-20">
        <TypographyWrapper level="p" title={error ?? content.empty.title} />
        <Button>{content.empty.action}</Button>
      </div>
    );

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
          onDelete={handleDelete}
          updatingId={null}
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
