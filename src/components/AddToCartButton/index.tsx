import { useState } from 'react';

// Components
import { Button } from '@/ui';

interface AddToCartButtonProps {
  className?: string;
  variant?: 'solid' | 'dark';
}

const AddToCartButton = ({ className, variant = 'dark' }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  // TODO: Add to cart action
  const handleAddToCart = () => {
    setIsAdding(true);
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
