import type { MarkdownData } from '@/i18n';
import type { ComponentType, SVGAttributes } from 'react';

export type SvgIcon = ComponentType<SVGAttributes<SVGSVGElement>>;

export interface Topic {
  id: string;
  label: string;
  icon?: SvgIcon;
}

export interface FaqSection {
  id: string;
  title: string;
  items: {
    id: string;
    label: string;
  }[];
}

export interface FaqContent extends MarkdownData {
  topics: Topic[];
  sections: FaqSection[];
  faqTitle: string;
}
