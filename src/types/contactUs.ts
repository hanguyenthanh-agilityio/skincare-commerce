import type { MarkdownData } from '@/i18n';

export interface ContactItem {
  id: string;
  label: string;
  value: string;
}

export interface ContactContent extends MarkdownData {
  title: string;
  subtitle: string;
  faqButton: string;
  body?: string;
  contacts: ContactItem[];
}
