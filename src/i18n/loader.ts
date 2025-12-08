import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from './messages';

export function loadSectionContent<T>(section: string, locale: Locale): T {
  const filePath = path.resolve(`src/content/${section}/${locale}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);

  return { ...(data as T), body: content };
}
