import type { Locale } from '@/types';

export const DEFAULT_META: Record<
  Locale,
  {
    title: string;
    description: string;
    siteName: string;
  }
> = {
  en: {
    siteName: 'Premium Skincare',
    title: 'Premium Skincare & Beauty Essentials',
    description:
      'Discover high-quality skincare products formulated to nourish, protect, and enhance your natural beauty.',
  },
  vi: {
    siteName: 'Premium Skincare',
    title: 'Mỹ Phẩm & Chăm Sóc Da Cao Cấp',
    description:
      'Khám phá các sản phẩm chăm sóc da chất lượng cao giúp nuôi dưỡng, bảo vệ và tôn vinh vẻ đẹp tự nhiên của bạn.',
  },
};
