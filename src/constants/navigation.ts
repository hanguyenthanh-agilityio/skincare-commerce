import type { MenuItem } from '@/types';

export const DROPDOWN_MENU_DATA: MenuItem[] = [
  {
    title: 'Shop',
    columns: [
      {
        heading: 'Category',
        items: [
          { label: 'Shop All', href: '/products' },
          { label: 'Cleanse', href: '/cleanse' },
          { label: 'Exfoliate', href: '/exfoliate' },
          { label: 'Treat & Masque', href: '/treat-masque' },
        ],
      },
      {
        heading: 'Skin Type',
        items: [
          { label: 'Normal', href: '/normal' },
          { label: 'Dry', href: '/dry' },
          { label: 'Oily', href: '/oily' },
          { label: 'Combination', href: '/combination' },
          { label: 'Sensitive', href: '/sensitive' },
        ],
      },
      {
        heading: 'Body',
        items: [
          { label: 'Shop All', href: '/products' },
          { label: 'Body Creams', href: '/body' },
          { label: 'Shower Gel', href: '/gel' },
          { label: 'Balms', href: '/balms' },
        ],
      },
      {
        heading: 'Fragrances',
        items: [
          { label: 'Normal', href: '/normal' },
          { label: 'Sauna', href: '/sauna' },
          { label: 'Essential Oils', href: '/oils' },
        ],
      },
    ],
    imageUrl:
      'https://imageskincare.com/cdn/shop/products/VITAL_C_hydrating_facial_cleanser_PDP_R01a.jpg?v=1762197992&width=800',
  },
];

export const NAV_LINKS = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Contact us', href: '/contact-us' },
  { label: 'FAQ', href: '/faq' },
];
