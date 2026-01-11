import { useState } from 'react';
// Components
import { Button } from '@/ui';

// Services
import { addToCart } from '@/services';

interface AddToCartButtonProps {
  productDocumentId: string;
  className?: string;
  variant?: 'solid' | 'dark';
}

const USER_DOCUMENT_ID = import.meta.env.PUBLIC_STRAPI_USER_DOCUMENT_ID;

const AddToCartButton = ({
  productDocumentId,
  className,
  variant = 'dark',
}: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      await addToCart({
        productDocumentId,
        userDocumentId: USER_DOCUMENT_ID,
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Button
      aria-label="Add to your cart"
      variant={variant}
      size="xl"
      disabled={isAdding}
      onClick={handleAddToCart}
      className={className}
    >
      {isAdding ? 'Added!' : 'Add to your cart'}
    </Button>
  );
};

export default AddToCartButton;
