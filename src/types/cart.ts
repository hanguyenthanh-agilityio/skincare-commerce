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

export interface CheckoutContent extends MarkdownData {
  title: string;

  paymentMethods: {
    paypal: string;
    amex: string;
    visa: string;
    mastercard: string;
  };

  form: {
    nameLabel: string;
    namePlaceholder: string;
    cardNumberLabel: string;
    cardNumberPlaceholder: string;
    expDateLabel: string;
    expDatePlaceholder: string;
    cvcLabel: string;
    cvcPlaceholder: string;
    saveInfoLabel: string;
    confirmButton: string;
  };
}
