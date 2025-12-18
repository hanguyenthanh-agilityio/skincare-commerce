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
