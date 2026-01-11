import { describe, it, expect } from 'vitest';
import type { RichTextBlock } from '@/schemas';

// Utils
import { richTextToMutable, richTextToPlainText } from '../richText';

const blocks: readonly RichTextBlock[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Hello',
        type: 'text',
      },
      {
        text: 'world',
        type: 'text',
      },
    ],
  },
  {
    type: 'paragraph',
    children: [
      {
        text: 'How',
        type: 'text',
      },
      {
        text: 'are',
        type: 'text',
      },
      {
        text: 'you',
        type: 'text',
      },
    ],
  },
];

describe('richTextToPlainText util', () => {
  it('should convert rich text blocks into a comma separated string', () => {
    const result = richTextToPlainText(blocks);

    expect(result).toBe('Hello, world, How, are, you');
  });

  it('should return empty string when blocks is undefined', () => {
    expect(richTextToPlainText()).toBe('');
  });

  it('should handle empty blocks array', () => {
    expect(richTextToPlainText([])).toBe('');
  });

  it('should handle blocks with empty children', () => {
    const input: readonly RichTextBlock[] = [{ type: 'paragraph', children: [] }];

    const result = richTextToPlainText(input);

    expect(result).toBe('');
  });
});

describe('richTextToMutable util', () => {
  it('should return a deep mutable copy', () => {
    const result = richTextToMutable(blocks);

    expect(result).toEqual([
      {
        type: 'paragraph',
        children: [{ text: 'Hello' }, { text: 'world' }],
      },
      {
        type: 'paragraph',
        children: [{ text: 'How' }, { text: 'are' }, { text: 'you' }],
      },
    ]);

    // deep copy check
    expect(result).not.toBe(blocks);
    expect(result[0]).not.toBe(blocks[0]);
    expect(result[0].children).not.toBe(blocks[0].children);
    expect(result[0].children[0]).not.toBe(blocks[0].children[0]);
  });

  it('should keep only type and text fields', () => {
    const input: readonly RichTextBlock[] = [
      {
        type: 'paragraph',
        children: [{ text: 'Title', type: 'text' }],
      },
    ];

    const result = richTextToMutable(input);

    expect(result).toEqual([
      {
        type: 'paragraph',
        children: [{ text: 'Title' }],
      },
    ]);
  });

  it('should return empty array when blocks is undefined', () => {
    expect(richTextToMutable()).toEqual([]);
  });

  it('should handle empty blocks array', () => {
    expect(richTextToMutable([])).toEqual([]);
  });
});
