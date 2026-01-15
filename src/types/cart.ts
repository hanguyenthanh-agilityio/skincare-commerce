// I18n
import type { MarkdownData } from '@/i18n';

// Types
import type { StrapiImageType, TProduct } from '@/types';

export type CartColumnKey = 'product' | 'price' | 'quantity' | 'subtotal';

export interface CartColumn {
  key: CartColumnKey;
  title: string;
  className?: string;
}

export interface CartItem {
  documentId: string;
  name: string;
  price: number;
  quantity: number;
  image?: StrapiImageType;
  volume?: string;
}

export interface StrapiCart {
  documentId: string;
  product: TProduct;
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
  empty: {
    title: string;
    description: string;
    action: string;
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

  summary: {
    title: string;
    subtotal: string;
    discount: string;
    tax: string;
    total: string;
  };
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface CartToastContent extends MarkdownData {
  addSuccess: {
    title: string;
    description: string;
  };
  addFailed: {
    title: string;
    description: string;
  };
  loading: {
    label: string;
  };
  ctaLabel: string;
}
