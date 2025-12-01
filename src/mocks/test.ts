import type { TBlog, TProduct } from '@/types';

export const MOCK_PRODUCTS: TProduct[] = [
  {
    image: '/images/pexels-shiny-diamond-3762453.jpg',
    name: 'Gentle Hydrating Cleanser',
    description: 'A mild cleanser that removes impurities without stripping moisture.',
    href: '/products/gentle-hydrating-cleanser',
    price: 22,
    badge: 'New',
    volume: '150ml',
  },
  {
    image: '/images/vitamin-c-serum.jpg',
    name: 'Vitamin C Brightening Serum',
    description: 'Potent antioxidant serum for glowing skin',
    href: '/products/vitamin-c-serum',
    price: 48,
    badge: 'Best Seller',
    volume: '30ml',
  },
];

export const MOCKS_BLOGS: TBlog[] = [
  {
    image: '/images/blog1.jpg',
    name: 'First Blog Post',
    category: 'Technology',
    href: '/blog/first-post',
  },
  {
    image: '/images/blog2.jpg',
    name: 'Second Amazing Article',
    category: 'Design',
    href: '/blog/second-post',
  },
  {
    image: '/images/blog3.jpg',
    name: 'Learning Astro',
    category: 'Tutorial',
    href: '/blog/learning-astro',
  },
];
