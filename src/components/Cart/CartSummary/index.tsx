// Components
import { HeadingWrapper, TypographyWrapper } from '@/components';

// UIs
import { Button } from '@/ui';

interface Props {
  total: string;
  label: string;
  shippingNote: string;
  checkoutText: string;
}

const CartSummary = ({ total, label, shippingNote, checkoutText }: Props) => {
  return (
    <aside aria-labelledby="cart-summary-heading" className="self-start">
      <div className="mb-3 flex items-start justify-between md:gap-10">
        <HeadingWrapper level="h2" className="text-2xl font-medium" title={label} />

        <div className="text-right">
          <HeadingWrapper
            level="h2"
            className="text-2xl font-medium pb-3 max-w-xl"
            title={`$${total}`}
          />
          <TypographyWrapper
            level="p"
            className="text-sm text-muted-foreground"
            title={shippingNote}
          />
        </div>
      </div>

      <Button aria-label={`${checkoutText}, total $${total}`} className="w-full rounded-none h-14">
        {checkoutText}
      </Button>
    </aside>
  );
};

export default CartSummary;
