import { TopicsSidebar } from '@/components';
import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, it, expect } from 'vitest';

const container = await AstroContainer.create();

describe('TopicsSidebar component', () => {
  const topicsWithoutIcons = [{ label: 'Skincare' }, { label: 'Makeup' }];

  it('renders heading with title "Topics"', async () => {
    const result = await container.renderToString(TopicsSidebar, {
      props: { topics: topicsWithoutIcons },
    });

    expect(result).toContain('Topics');
    expect(result).toMatch(/<h2[^>]*>/);
  });

  it('does not render icon when topic.icon is missing', async () => {
    const result = await container.renderToString(TopicsSidebar, {
      props: { topics: topicsWithoutIcons },
    });

    expect(result).not.toContain('data-testid="topic-icon"');
  });

  it('applies list spacing and item styles', async () => {
    const result = await container.renderToString(TopicsSidebar, {
      props: { topics: topicsWithoutIcons },
    });

    expect(result).toContain('space-y-4');
    expect(result).toContain('flex items-center gap-3 text-sm text-muted-foreground');
  });

  it('wraps content inside an aside element', async () => {
    const result = await container.renderToString(TopicsSidebar, {
      props: { topics: topicsWithoutIcons },
    });

    expect(result).toMatch(/<aside[^>]*>/);
    expect(result).toMatch(/<\/aside>/);
  });

  it('renders empty list when topics array is empty', async () => {
    const result = await container.renderToString(TopicsSidebar, {
      props: { topics: [] },
    });

    expect(result).toMatch(/<ul[^>]*>\s*<\/ul>/);
  });
});
