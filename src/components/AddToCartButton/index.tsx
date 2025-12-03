import { useState } from 'react';

// Components
import { Button } from '@/ui';

interface AddToCartButtonProps {
  className?: string;
}

const AddToCartButton = ({ className }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  // TODO: Add to cart action
  const handleAddToCart = () => {
    setIsAdding(true);
  };

  return (
    <Button
      aria-label="Add to your cart"
      variant="dark"
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
