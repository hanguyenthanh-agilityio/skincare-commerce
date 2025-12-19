export const PRODUCT_DETAIL = {
  ingredients: [
    {
      type: 'paragraph',
      children: [{ text: 'Amino Acid Cleanser, Glycerin, Green Tea Extract' }],
    },
  ],
  benefits: [
    {
      type: 'paragraph',
      children: [{ text: 'Cleanses gently, prevents dryness, refreshes skin' }],
    },
  ],
  usages: [
    {
      type: 'paragraph',
      children: [{ text: 'Massage onto wet skin and rinse thoroughly' }],
    },
  ],
};

/**
 * ℹ️ NOTE:
 * Just for test UI - will remove with integration API task
 */
import type { TProduct } from '@/types';

export const MOCK_PRODUCTS: TProduct[] = [
  {
    slug: 'gentle-balancing-toner',
    name: 'Gentle Balancing Toner',
    volume: '200ml',
    href: '/products/detail/gentle-balancing-toner',
    price: 28,
    category: 'cleanse',
    skinType: 'sensitive',
    images: [
      {
        url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
        alternativeText: 'Gentle Balancing Toner',
      },
    ],
  },
  {
    slug: 'hydrating-serum',
    name: 'Hydrating Serum',
    volume: '30ml',
    href: '/products/detail/hydrating-serum',
    price: 28,
    category: 'treat-masque',
    skinType: 'dry',
    images: [
      {
        url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
        alternativeText: 'Gentle Balancing Toner',
      },
    ],
  },
];

export const ATTRIBUTES = [
  {
    label: 'Skin Feel',
    value: 'Hyaluronic Acid',
  },
  {
    label: 'Key Ingredients',
    value: 'Hyaluronic Acid, Glycerin, Chamomile Extract',
  },
];

export const PRODUCT_INFO = {
  name: 'Hydrating Facial Toner',
  subTitle: 'Lightweight daily hydration',
  description: 'A gentle toner that helps hydrate and balance the skin after cleansing.',
  price: 18,
  volume: '200ml',
  href: '/products/hydrating-facial-toner',
  slug: 'hydrating-facial-toner',

  badge: 'Best Seller',

  images: [
    {
      url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
      alternativeText: 'Gentle Balancing Toner',
    },
  ],
};
