import { useEffect, useState, useCallback, useMemo } from 'react';

// types
import type { CartItem } from '@/types';

// Services
import { getCartByUser, updateCartQuantity, deleteCartItem } from '@/services';

// Utils
import { getCartTotal } from '@/utils';

// Constants
import { ERROR_MESSAGES, MAX_QUANTITY, MIN_QUANTITY } from '@/constants';

const USER_DOCUMENT_ID = import.meta.env.PUBLIC_STRAPI_USER_DOCUMENT_ID;

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch cart once
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const items = await getCartByUser({ userDocumentId: USER_DOCUMENT_ID });
        setCartItems(items);
      } catch {
        setError(ERROR_MESSAGES.CART_FETCH_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Derived state
  const total = useMemo(() => getCartTotal(cartItems), [cartItems]);

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

      const prevItems = cartItems;

      // Optimistic update
      setUpdatingId(cartDocumentId);
      setCartItems((items) =>
        items.map((item) => (item.documentId === cartDocumentId ? { ...item, quantity } : item)),
      );

      try {
        await updateCartQuantity({ cartDocumentId, quantity });
      } catch {
        setCartItems(prevItems);
        setError(ERROR_MESSAGES.CART_UPDATE_FAILED);
      } finally {
        setUpdatingId(null);
      }
    },
    [cartItems],
  );

  // Optimistic delete
  const removeItem = useCallback(
    async (cartDocumentId: string) => {
      const prevItems = cartItems;
      setUpdatingId(cartDocumentId);

      setCartItems((items) => items.filter((item) => item.documentId !== cartDocumentId));

      try {
        await deleteCartItem(cartDocumentId);
      } catch {
        setCartItems(prevItems);
        setError(ERROR_MESSAGES.CART_DELETE_FAILED);
      } finally {
        setUpdatingId(null);
      }
    },
    [cartItems],
  );

  return {
    cartItems,
    total,
    isLoading,
    updatingId,
    error,
    updateQuantity,
    removeItem,
  };
};
