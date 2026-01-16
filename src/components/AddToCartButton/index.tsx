import { navigate } from 'astro:transitions/client';
import { useState } from 'react';
import { toast } from 'sonner';

import { buildRoute, loadContent } from '@/i18n';

// Types
import type { CartToastContent, Locale } from '@/types';

// Constants
import { ROUTER } from '@/constants';

// Services
import { apiClient } from '@/services';

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
      const response = await apiClient.post('/api/cart/add', {
        body: { productDocumentId },
      });

      if (response.error) {
        if (response.error.message?.toLowerCase().includes('unauthorized')) {
          await navigate(buildRoute(ROUTER.LOGIN, locale));
          return;
        }

        throw response.error;
      }

      // ✅ Success
      toast.success(addSuccess.title, {
        description: addSuccess.description,
        id: toastId,
      });

      return response.data;
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
