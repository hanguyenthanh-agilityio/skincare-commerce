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

export function useCart(initialItems: CartItem[]) {
  const [state, setState] = useState<UseCartState>({
    items: initialItems,
    updatingId: null,
    error: null,
  });

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
}
