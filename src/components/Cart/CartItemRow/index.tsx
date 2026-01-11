// Components
import { QuantityInput, StrapiImage, TypographyWrapper } from '@/components';

// Types
import type { CartItem } from '@/types';

// Utils
import { getCartItemSubtotal } from '@/utils';

interface Props {
  item: CartItem;
  disabled?: boolean;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItemRow = ({ item, disabled, onQuantityChange }: Props) => (
  <div className="w-full grid grid-cols-6 gap-4 md:gap-0 md:grid-cols-[1fr_120px_140px_120px] lg:grid-cols-[1fr_180px_200px_180px] items-center border-b py-6">
    {/* Product */}
    <div className="col-span-4 md:col-span-1 flex gap-4 items-center">
      <StrapiImage image={item.image} className="h-16 w-12 object-contain" />

      <div>
        <TypographyWrapper level="p" className="font-bold" title={item.name} />
        <TypographyWrapper level="span" title={item.volume ?? ''} />
        <TypographyWrapper level="span" title={`$${item.price}`} className="md:hidden block" />
      </div>
    </div>

    {/* Price */}
    <TypographyWrapper level="span" title={`$${item.price}`} className="hidden md:block" />

    {/* Quantity */}
    <div className="col-span-2 md:col-span-1 flex justify-end md:justify-start">
      <QuantityInput
        value={item.quantity}
        onChange={(value) => onQuantityChange(item.id, value)}
        className="rounded-none bg-white"
        disabled={disabled}
      />
    </div>

    {/* Subtotal */}
    <TypographyWrapper
      level="span"
      title={`$${getCartItemSubtotal(item)}`}
      className="hidden md:block"
    />
  </div>
);

export default CartItemRow;
