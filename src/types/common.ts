export interface StrapiImageType {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

export interface HighlightContent {
  subTitle?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  align?: 'left' | 'center';
  colorScheme?: 'dark' | 'light';
  variant?: 'outlineSoft' | 'outlineWhite';
  image: string;
  body?: string;
}
