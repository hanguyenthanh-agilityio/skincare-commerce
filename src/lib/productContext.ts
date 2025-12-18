import type { ProductContext, TProduct } from '@/types';

export function getProductContext(product?: TProduct): ProductContext | undefined {
  if (!product) return undefined;

  if (product.skinType) {
    return {
      type: 'skinType',
      value: product.skinType,
    };
  }

  if (product.category) {
    return {
      type: 'category',
      value: product.category,
    };
  }

  return undefined;
}
