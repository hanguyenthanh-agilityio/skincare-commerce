import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const loadPageContent = <T>(page: string, locale: 'en' | 'vi'): T => {
  const filePath = path.resolve(`src/content/${page}/${locale}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing content file: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);

  return { ...(data as T), body: content };
};
