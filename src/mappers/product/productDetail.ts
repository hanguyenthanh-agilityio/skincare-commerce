import type { TProduct, Attribute } from '@/types';
import type { ProductDetailUI } from '@/types';
import type { RichTextBlock } from '@/schemas';

import { calculateAverageRating, getRatingBreakdown, richTextToPlainText } from '@/utils';

export const mapProductToProductDetailUI = (
  product: TProduct,
  attributeLabels: {
    skinFeel?: string;
    ingredients?: string;
  },
): ProductDetailUI => {
  const attributes: Attribute[] = [
    product.skinFeel && attributeLabels.skinFeel
      ? {
          label: attributeLabels.skinFeel,
          value: product.skinFeel,
        }
      : null,

    product.ingredients && attributeLabels.ingredients
      ? {
          label: attributeLabels.ingredients,
          value: richTextToPlainText(product.ingredients),
        }
      : null,
  ].filter(Boolean) as Attribute[];

  const reviews = product.reviews ?? [];

  return {
    product,

    attributes,

    reviews: {
      items: reviews,
      hasReviews: reviews.length > 0,
      total: reviews.length,
      average: calculateAverageRating(reviews),
      breakdown: getRatingBreakdown(reviews),
    },

    benefits: {
      ingredients: product.ingredients as RichTextBlock[] | undefined,
      benefits: product.benefits as RichTextBlock[] | undefined,
      usages: product.usages as RichTextBlock[] | undefined,
    },
  };
};
