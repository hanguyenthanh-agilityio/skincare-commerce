import type { RichTextBlock } from '@/schemas';

export const richTextToPlainText = (blocks?: readonly RichTextBlock[]) =>
  blocks
    ?.flatMap((block) => block.children)
    .map((child) => child.text)
    .join(', ') ?? '';
