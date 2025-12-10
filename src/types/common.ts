export interface StrapiImageType {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

export interface ContentBlockType {
  title: string;
  subTitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  align?: 'left' | 'center';
  colorScheme?: 'dark' | 'light';
  variant?: 'outlineSoft' | 'outlineWhite';
  className?: string;
  image?: string;
}

export type Slide = ContentBlockType;

export type HighlightData = ContentBlockType;

export interface HomeContent {
  highlight: HighlightData;
  carousel: Slide[];
  feature: ContentBlockType;
  quote: {
    title: string;
    description: string;
  };
  body?: string;
}
