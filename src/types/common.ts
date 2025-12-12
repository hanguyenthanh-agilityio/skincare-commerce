import type { MarkdownData } from '@/i18n';

export interface StrapiImageType {
  url: string;
  width?: number;
  height?: number;
  alternativeText?: string;
}

export interface ContentBlockText {
  title: string;
  subTitle?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

// Common UI options for layout and design
export type ContentAlignment = 'left' | 'center';
export type ColorScheme = 'dark' | 'light';
export type ButtonVariant = 'outlineSoft' | 'outlineWhite';

// Reusable content block with styling options
export interface ContentBlockType extends ContentBlockText {
  align?: ContentAlignment;
  colorScheme?: ColorScheme;
  variant?: ButtonVariant;
  className?: string;
}

// Fullscreen image banners with text overlay
export interface HighlightSection extends ContentBlockType {
  image?: StrapiImageType | null;
}

// Slide — used in carousels
export interface Slide extends ContentBlockType {
  image?: StrapiImageType | null;
}

// Feature section
export interface FeatureSection extends ContentBlockType {
  image?: StrapiImageType | null;
}

// Quote section
export interface QuoteSection {
  title: string;
  description: string;
}

export interface ProductSection {
  title: string;
  subtitle: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface BlogSection {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
}

// Combining all sections the page needs
export interface HomeContent extends MarkdownData {
  highlight: HighlightSection;
  carousel: Slide[];
  feature: FeatureSection;
  quote: QuoteSection;
  product: ProductSection;
  blog: BlogSection;
  body?: string;
}

export interface AboutContent extends MarkdownData {
  highlight: HighlightSection[];
  image: StrapiImageType | null;
  feature: FeatureSection;
  quote: QuoteSection;
  body?: string;
}
