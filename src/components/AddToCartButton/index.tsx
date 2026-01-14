import { useState } from 'react';
import { toast } from 'sonner';

import { buildRoute, loadContent } from '@/i18n';

// Types
import type { CartToastContent, Locale } from '@/types';

// Constants
import { ROUTER } from '@/constants';

// Components
import { Button } from '@/ui';

interface AddToCartButtonProps {
  productDocumentId: string;
  className?: string;
  variant?: 'solid' | 'dark';
  locale: Locale;
}

const AddToCartButton = ({
  productDocumentId,
  className,
  variant = 'dark',
  locale,
}: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const { addSuccess, addFailed, loading, ctaLabel } = loadContent<CartToastContent>(
    'cart-toast',
    locale,
  );

  const handleAddToCart = async () => {
    if (isAdding) return;

    setIsAdding(true);

    // 🔄 Loading toast
    const toastId = toast.loading(loading.label);

    try {
      const res = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productDocumentId }),
      });

      if (!res.ok) {
        const error = await res.json();

        if (res.status === 401) {
          window.location.href = buildRoute(ROUTER.LOGIN, locale);
        }

        throw new Error(error?.message || 'ADD_TO_CART_FAILED');
      }

      // ✅ Success
      toast.success(addSuccess.title, {
        description: addSuccess.description,
        id: toastId,
      });

      return res.json();
    } catch {
      setIsAdding(false);

      toast.error(addFailed.title, {
        description: addFailed.description,
        id: toastId,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      aria-label={ctaLabel}
      variant={variant}
      size="xl"
      disabled={isAdding}
      onClick={handleAddToCart}
      className={className}
    >
      {isAdding ? loading.label : ctaLabel}
    </Button>
  );
};

export default AddToCartButton;
