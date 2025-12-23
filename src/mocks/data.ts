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

export const BLOG_DETAIL_CONTENT = {
  hero: {
    title:
      'Countless solutions have been discovered in nature. We simply need to observe and tap into its inherent brilliance',
    description:
      'Countless solutions have been discovered in nature. We simply need to observe and tap into its inherent brilliance',
  },

  section: {
    title: 'Harnessing nature’s intelligence to create advanced skincare solutions',
    description:
      'By studying botanical actives and skin biology, we transform natural discoveries into clinically proven formulations.',
  },
};

export const BLOG_HERO_IMAGE = {
  id: 10,
  url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668448456942_0f2549ad-4f14-4e19-81c6-23fa6fca465d.jpg?v=1760637019',
  alternativeText: 'Blog hero image',
  width: 1600,
  height: 900,
};

export const BLOG_IMAGE = {
  main: {
    id: 1,
    url: 'https://canada.gloskinbeauty.com/cdn/shop/files/egf-facial-23-stylized_3_f38ab37e-fc2a-4ed4-80bb-572e59481da7.jpg?v=1756303945',
    alternativeText: 'Hero product image',
    width: 1600,
    height: 1000,
  },
  side: {
    id: 2,
    url: 'https://www.gloskinbeauty.com/cdn/shop/articles/668462285038_cd82d0bb-d3fd-4003-9808-ac35e1b04146.jpg?v=1760636983',
    alternativeText: 'Product detail texture',
    width: 800,
    height: 600,
  },
};
