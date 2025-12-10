import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
import type { Locale } from '@/types';

// Safe type for frontmatter data (replaces any)
export interface MarkdownData {
  [key: string]: unknown;
}

// The resolved type after loading markdown
export type LoadContentResult<T extends MarkdownData> = T & {
  body: string;
};
/**
 * Load markdown content from src/content/{name}/{locale}.md
 * @param name folder name (page: home, about, ...) or shared content (footer)
 * @param locale 'en' | 'vi'
 */
export const loadContent = <T extends MarkdownData = MarkdownData>(
  name: string,
  locale: Locale,
): LoadContentResult<T> => {
  const filePath = path.resolve(`src/content/${name}/${locale}.md`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content file: ${filePath}`);
  }
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    ...(data as T),
    body: content,
  };
};
