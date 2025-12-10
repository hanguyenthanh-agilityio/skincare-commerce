import type { MarkdownData } from '@/i18n';
import type { NavLink } from '@/types';

export interface NavigationSection {
  title: string;
  links: NavLink[];
}

export interface FooterContent extends MarkdownData {
  navigation: NavigationSection[];
  footerLinks: NavLink[];
  socialTitle: string;
  copyright: string;
}
