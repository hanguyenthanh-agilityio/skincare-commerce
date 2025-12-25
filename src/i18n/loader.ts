import yaml from 'js-yaml';

// Types
import type { Locale } from '@/types';

export interface MarkdownData {
  [key: string]: unknown;
}

export type LoadContentResult<T extends MarkdownData> = T & {
  body: string;
};

// Import raw markdown at build time (Vite)
const markdownFiles = import.meta.glob('/src/content/**/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parseFrontmatter(raw: string) {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw };
  }

  const end = raw.indexOf('---', 3);
  if (end === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(3, end).trim();
  const content = raw.slice(end + 3).trim();

  const data = yaml.load(frontmatter);

  return {
    data: typeof data === 'object' && data !== null ? data : {},
    content,
  };
}

export const loadContent = <T extends MarkdownData = MarkdownData>(
  name: string,
  locale: Locale,
): LoadContentResult<T> => {
  const filePath = `/src/content/${name}/${locale}.md`;
  const raw = markdownFiles[filePath] || markdownFiles[`./src/content/${name}/${locale}.md`];

  if (!raw) {
    throw new Error(`Missing content file: ${filePath}`);
  }

  const { data, content } = parseFrontmatter(raw as string);

  return {
    ...(data as T),
    body: content,
  };
};
