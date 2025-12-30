import type { MarkdownData } from '@/i18n';
import type { ComponentType, SVGAttributes } from 'react';
import type { NavLink } from './navigation';

export type SvgIcon = ComponentType<SVGAttributes<SVGSVGElement>>;

export interface Topic {
  id: string;
  label: string;
  icon?: SvgIcon;
}

export interface FaqSection {
  id: string;
  title: string;
  items: NavLink[];
}

export interface FaqContent extends MarkdownData {
  topics: Topic[];
  sections: FaqSection[];
  faqTitle: string;
}
