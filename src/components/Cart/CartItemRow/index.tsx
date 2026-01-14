import { Trash2 } from 'lucide-react';

// Components
import { QuantityInput, StrapiImage, TypographyWrapper } from '@/components';

// UIs
import { Button } from '@/ui';

// Types
import type { CartItem } from '@/types';

// Utils
import { calculateCartItemTotal } from '@/utils';

interface Props {
  cartItem: CartItem;
  disabled?: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
  onDelete: (id: string) => void;
}

const CartItemRow = ({ cartItem, disabled, onQuantityChange, onDelete }: Props) => {
  const { documentId, quantity, product } = cartItem;

  const { images, name, volume, price } = product;

  const handleOnDelete = () => onDelete(documentId);

  return (
    <div className="w-full grid grid-cols-6 gap-4 md:gap-0 md:grid-cols-[1fr_120px_140px_120px] lg:grid-cols-[1fr_180px_200px_180px] items-center border-b py-6">
      {/* Product */}
      <div className="col-span-4 md:col-span-1 flex gap-4 items-center">
        <StrapiImage image={images[0]} className="h-16 w-12 object-contain" />

        <div>
          <TypographyWrapper level="p" className="font-bold" title={name} />
          <TypographyWrapper level="span" title={volume ?? ''} />
          <TypographyWrapper level="span" title={`$${price}`} className="md:hidden block" />
        </div>
      </div>

      {/* Price */}
      <TypographyWrapper level="span" title={`$${price}`} className="hidden md:block" />

      {/* Quantity */}
      <div className="col-span-2 md:col-span-1 flex justify-end md:justify-start">
        <QuantityInput
          value={quantity}
          onChange={(value) => onQuantityChange(documentId, value)}
          className="rounded-none bg-white"
          disabled={disabled}
        />

        <Button
          variant="ghost"
          type="button"
          onClick={handleOnDelete}
          disabled={disabled}
          aria-label="Remove item"
          className="text-gray-400 hover:text-red-600 transition disabled:opacity-50 px-2"
        >
          <Trash2 size={18} />
        </Button>
      </div>

      {/* Subtotal */}
      <TypographyWrapper
        level="span"
        title={`$${calculateCartItemTotal(cartItem)}`}
        className="hidden md:block"
      />
    </div>
  );
};

export default CartItemRow;
