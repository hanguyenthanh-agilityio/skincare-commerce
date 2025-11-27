import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md transition-all text-sm font-medium disabled:pointer-events-none disabled:opacity-50 outline-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',

        // Existing
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',

        // ---- CUSTOM BUTTONS (your UI spec) ----

        // 1️⃣ Button “More”
        outlineSoft: 'border border-muted rounded-none text-primary text-sm hover:bg-[#ecebe5]',

        // 2️⃣ Add to cart
        dark: 'bg-black text-white hover:bg-black/80',

        // 3️⃣ Add to cart
        light: 'bg-white text-black border border-black hover:bg-black/5',

        // 4️⃣ Discover More (white outline)
        outlineWhite: 'border border-white text-white hover:bg-white/10 backdrop-blur-sm',
      },

      size: {
        default: 'h-11 px-6',
        sm: 'h-9 px-4',
        lg: 'h-12 px-8',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
