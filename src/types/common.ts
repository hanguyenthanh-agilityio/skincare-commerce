export interface StrapiImageType {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

export interface HighlightContent {
  highlight: {
    subTitle: string;
    title: string;
    description: string;
    buttonText: string;
    buttonHref: string;
    colorScheme: 'light' | 'dark';
    variant?: 'outlineWhite' | 'outlineSoft' | undefined;
    align: 'left' | 'center';
    image: string;
  };
  body?: string;
}
