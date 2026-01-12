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
  documentId: string;
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

export interface StrapiProduct {
  documentId: string;
  name: string;
  price: number;
  volume?: string | null;
  thumbnail?: StrapiImageType | null;
  images?: StrapiImageType[];
}

export interface StrapiCart {
  documentId: string;
  quantity: number | string;
  products?: StrapiProduct[] | null;
}

export function mapStrapiCartToCartItem(cart: StrapiCart): CartItem {
  const product = cart.products?.[0];

  if (!product) {
    throw new Error(`Cart ${cart.documentId} has no product`);
  }

  const firstImage = product.images?.[0] ?? product.thumbnail;

  return {
    id: cart.documentId,
    documentId: cart.documentId,
    quantity: Number(cart.quantity),

    name: product.name,
    price: product.price,
    volume: product.volume ?? undefined,
    image: firstImage ?? undefined,
  };
}
