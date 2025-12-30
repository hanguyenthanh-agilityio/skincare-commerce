import type { TProduct } from '@/types';

export const MOCK_PRODUCTS: TProduct[] = [
  {
    documentId: 'gentle-balancing-toner',
    name: 'Gentle Balancing Toner',
    volume: '200ml',
    price: 28,
    averageRating: 100,
    stock: 100,
    category: {
      name: 'cleanse',
      slug: 'cleanse',
    },
    skinType: {
      name: 'sensitive',
      slug: 'sensitive',
    },
    images: [
      {
        url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
        alternativeText: 'Gentle Balancing Toner',
      },
    ],
  },
  {
    name: 'Hydrating Serum',
    volume: '30ml',
    documentId: '/products/hydrating-serum',
    price: 28,
    averageRating: 100,
    stock: 100,
    category: {
      name: 'Treat & Masque',
      slug: 'treat-masque',
    },
    skinType: {
      name: 'Dry',
      slug: 'dry',
    },
    images: [
      {
        url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
        alternativeText: 'Gentle Balancing Toner',
      },
    ],
  },
];

export const CART_ITEMS = [
  {
    id: '1',
    name: 'Reverence Aromatique Hand Balm',
    volume: '75 ml',
    price: 25,
    image: {
      url: 'https://canada.gloskinbeauty.com/cdn/shop/files/egf-facial-23-stylized_3_f38ab37e-fc2a-4ed4-80bb-572e59481da7.jpg?v=1756303945',
      alternativeText: 'Reverence Aromatique Hand Balm',
    },
    quantity: 1,
  },
  {
    id: '2',
    name: 'Classic Skin Care Kit',
    volume: '300 ml',
    price: 85,
    image: {
      url: 'https://canada.gloskinbeauty.com/cdn/shop/files/egf-facial-23-stylized_3_f38ab37e-fc2a-4ed4-80bb-572e59481da7.jpg?v=1756303945',
      alternativeText: 'Classic Skin Care Kit',
    },
    quantity: 1,
  },
];
