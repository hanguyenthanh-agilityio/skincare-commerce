import type { RichTextBlock } from '@/schemas';

export const richTextToPlainText = (blocks?: readonly RichTextBlock[]) =>
  blocks
    ?.flatMap((block) => block.children)
    .map((child) => child.text)
    .join(', ') ?? '';

export const richTextToMutable = (blocks?: readonly RichTextBlock[]) =>
  blocks?.map((block) => ({
    type: block.type,
    children: block.children.map((child) => ({ text: child.text })),
  })) ?? [];
