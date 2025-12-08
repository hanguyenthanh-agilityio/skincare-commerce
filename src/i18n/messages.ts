export type Locale = 'en' | 'vi';

export const messages = {
  en: {
    highlight: {
      subTitle: 'Revitalize Your Body',
      title: 'Effective Ingredients for Visible Results',
      description:
        'Our body products are rich in highly effective ingredients, achieve visible results, firm the skin and leave it feeling soft and supple.',
      buttonText: 'Discover More',
    },
  },

  vi: {
    highlight: {
      subTitle: 'Tái tạo cơ thể bạn',
      title: 'Thành phần hiệu quả mang lại kết quả rõ rệt',
      description:
        'Các sản phẩm chăm sóc cơ thể của chúng tôi chứa những thành phần có hiệu quả cao, mang lại kết quả rõ rệt, giúp làn da săn chắc và mịn màng.',
      buttonText: 'Khám phá thêm',
    },
  },
} as const;

export type Section = keyof (typeof messages)['en'];
