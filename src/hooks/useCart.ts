import { useEffect, useState, useCallback, useMemo } from 'react';

// types
import type { CartItem } from '@/types';

// Utils
import { calculateCartTotalPrice } from '@/utils';

// Constants
import { ERROR_MESSAGES, MAX_QUANTITY, MIN_QUANTITY } from '@/constants';

export const useCart = () => {
  const [cartList, setCartList] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart once
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('/api/cart/get');

        if (!res.ok) {
          throw new Error('FETCH_FAILED');
        }

        const { data } = await res.json();

        setCartList(data);
      } catch {
        setError(ERROR_MESSAGES.CART_FETCH_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Derived state
  const total = useMemo(() => calculateCartTotalPrice(cartList), [cartList]);

  // Optimistic quantity update
  const updateQuantity = useCallback(
    async (cartDocumentId: string, nextQuantity: number) => {
      // Validate input
      if (!Number.isFinite(nextQuantity)) {
        setError(ERROR_MESSAGES.INVALID_QUANTITY);
        return;
      }

      // Clamp quantity
      const quantity = Math.max(MIN_QUANTITY, Math.min(nextQuantity, MAX_QUANTITY));

      const prevItems = cartList;

      // Optimistic update
      setUpdatingId(cartDocumentId);
      setCartList((items) =>
        items.map((item) => (item.documentId === cartDocumentId ? { ...item, quantity } : item)),
      );

      try {
        await fetch('/api/cart/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cartDocumentId,
            quantity,
          }),
        });
      } catch {
        setCartList(prevItems);
        setError(ERROR_MESSAGES.CART_UPDATE_FAILED);
      } finally {
        setUpdatingId(null);
      }
    },
    [cartList],
  );

  // Optimistic delete
  const removeItem = useCallback(
    async (cartDocumentId: string) => {
      const prevItems = cartList;
      setUpdatingId(cartDocumentId);

      setCartList((items) => items.filter((item) => item.documentId !== cartDocumentId));

      try {
        // await deleteCartItem(cartDocumentId);
        await fetch('/api/cart/delete', {
          method: 'DELETE',
          body: JSON.stringify({ cartDocumentId }),
        });
      } catch {
        setCartList(prevItems);
        setError(ERROR_MESSAGES.CART_DELETE_FAILED);
      } finally {
        setUpdatingId(null);
      }
    },
    [cartList],
  );

  return {
    cartList,
    total,
    isLoading,
    updatingId,
    error,
    updateQuantity,
    removeItem,
  };
};
