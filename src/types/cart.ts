// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type { StrapiImageType } from '@/types';

export type CartColumnKey = 'product' | 'price' | 'quantity' | 'subtotal';

export interface CartColumn {
  key: CartColumnKey;
  title: string;
  className?: string;
}

export interface CartProduct {
  id: string;
  name: string;
  volume?: string;
  price: number;
  image: StrapiImageType;
}

export interface CartItem extends CartProduct {
  quantity: number;
}
export interface CartContent extends MarkdownData {
  title: string;
  description: string;
  columns: {
    cart: string;
    price: string;
    quantity: string;
    subtotal: string;
  };
  summary: {
    totalLabel: string;
    shippingNote: string;
    checkout: string;
  };
}
