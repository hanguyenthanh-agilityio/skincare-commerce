import { useState } from 'react';
import { cn } from '@/lib/utils';

// Components
import { Button } from '@/ui';

interface AddToCartButtonProps {
  productId: string;
  className?: string;
}

const AddToCartButton = ({ productId, className }: AddToCartButtonProps) => {
  const [isAdding, setIsAdding] = useState(false);

  // TODO: Add to cart action
  const handleAddToCart = () => {
    setIsAdding(true);
    console.log('productId', productId);
  };

  return (
    <Button
      aria-label="Add to your cart"
      variant="dark"
      disabled={isAdding}
      onClick={handleAddToCart}
      className={cn(
        'w-full h-62 opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:pointer-events-auto',
        className,
      )}
    >
      {isAdding ? 'Added!' : 'Add to your cart'}
    </Button>
  );
};

export default AddToCartButton;
