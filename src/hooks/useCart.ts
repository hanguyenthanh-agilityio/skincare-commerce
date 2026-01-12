import { useCallback, useState } from 'react';

// types
import type { CartItem } from '@/types';

// Services
import { updateCartQuantity, deleteCartItem } from '@/services';

interface UseCartState {
  items: CartItem[];
  updatingId: string | null;
  error: string | null;
}

// Custom hook to manage cart state with optimistic updates
export const useCart = (initialItems: CartItem[]) => {
  const [state, setState] = useState<UseCartState>({
    items: initialItems,
    updatingId: null,
    error: null,
  });

  /**
   * Optimistic update helper
   * @param id: cart item id being updated
   * @param optimisticUpdate: function to immediately apply optimistic change
   * @param rollback: function to revert state if API fails
   * @param effect: async API call
   */
  const optimistic = async (
    id: string,
    optimisticUpdate: () => void,
    rollback: () => void,
    effect: () => Promise<void>,
  ) => {
    optimisticUpdate();

    try {
      await effect();
    } catch (err) {
      rollback();

      if (err instanceof Error) {
        setState((s) => ({ ...s, error: err.message }));
      }
    } finally {
      setState((s) => ({ ...s, updatingId: null }));
    }
  };

  /**
   * Update cart item quantity
   * @param cartId: id of cart item
   * @param quantity: new quantity
   */
  const updateQuantity = useCallback(
    (cartId: string, quantity: number) => {
      const prev = state.items;

      optimistic(
        cartId,
        () =>
          setState((s) => ({
            ...s,
            updatingId: cartId,
            error: null,
            items: s.items.map((i) => (i.id === cartId ? { ...i, quantity } : i)),
          })),
        () =>
          setState((s) => ({
            ...s,
            items: prev,
          })),
        () =>
          updateCartQuantity({
            cartDocumentId: cartId,
            quantity,
          }),
      );
    },
    [state.items],
  );

  /**
   * Remove cart item
   * @param cartId: id of cart item to remove
   */
  const removeItem = useCallback(
    (cartId: string) => {
      const prev = state.items;

      optimistic(
        cartId,
        () =>
          setState((s) => ({
            ...s,
            updatingId: cartId,
            error: null,
            items: s.items.filter((i) => i.id !== cartId),
          })),
        () =>
          setState((s) => ({
            ...s,
            items: prev,
          })),
        () => deleteCartItem(cartId),
      );
    },
    [state.items],
  );

  return {
    items: state.items,
    updatingId: state.updatingId,
    error: state.error,
    updateQuantity,
    removeItem,
  };
};
