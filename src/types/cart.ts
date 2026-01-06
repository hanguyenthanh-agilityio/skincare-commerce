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
  quantity?: number;
  image?: StrapiImageType;
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

export interface StrapiProduct {
  documentId: string;
  title?: string | null;
  price?: number | null;
  volume?: string | null;
  thumbnail?: StrapiImageType | null;
}

export interface StrapiCart {
  documentId: string;
  quantity: number | string;
  products?: StrapiProduct[] | null;
}

export function mapStrapiCartToCartItem(cart: StrapiCart): CartItem {
  const product = cart.products?.[0];

  return {
    id: cart.documentId,
    quantity: Number(cart.quantity) || 0,

    // Defensive mapping
    name: product?.title ?? '',
    price: product?.price ?? 0,
    volume: product?.volume ?? undefined,
    image: product?.thumbnail ?? undefined,
  };
}
