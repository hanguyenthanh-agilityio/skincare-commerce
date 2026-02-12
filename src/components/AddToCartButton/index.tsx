import { useState } from 'react';
import { toast } from 'sonner';

import { loadContent } from '@/i18n';

// Types
import type { CartToastContent, Locale } from '@/types';

// Services
import { addToCart } from '@/services';

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

    const toastId = toast.loading(loading.label);

    const response = await addToCart(productDocumentId);

    setIsAdding(false);

    if (response.error) {
      toast.error(addFailed.title, {
        description: addFailed.description,
        id: toastId,
      });
      return;
    }

    // ✅ Success
    toast.success(addSuccess.title, {
      description: addSuccess.description,
      id: toastId,
    });
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
