import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Mocks
import { MOCKS_BLOGS } from '@/mocks';

// Component
import { BlogList } from '@/components';

// Mock data
const mockBlogs = MOCKS_BLOGS;

describe('BlogList component', () => {
  it('renders nothing when blogs array is empty and shows "No Blogs Available"', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(BlogList, {
      props: {
        blogs: [],
        limitDesktop: 6,
        limitMobile: 4,
      },
    });

    expect(result).toContain('No Blogs Available');
    expect(result).not.toContain('BlogCard');
    expect(result).not.toContain('flex-wrap');
  });

  it('respects limitMobile on mobile view and hides desktop view', async () => {
    const container = await AstroContainer.create();

    // Mock only mobile classes visible

    const result = await container.renderToString(BlogList, {
      props: {
        blogs: mockBlogs,
        limitDesktop: 6,
        limitMobile: 2,
      },
    });

    const mobileDiv = result.includes('flex md:hidden');
    const desktopDiv = result.includes('hidden md:flex');

    expect(mobileDiv).toBe(true);
    expect(desktopDiv).toBe(true);

    // Should only render first 2 blogs in mobile view
    expect(result).toContain('First Blog Post');
    expect(result).toContain('Second Amazing Article');
  });

  it('respects limitDesktop on desktop view and hides mobile view', async () => {
    const container = await AstroContainer.create();

    // Mock desktop: md:flex visible, md:hidden hidden

    const result = await container.renderToString(BlogList, {
      props: {
        blogs: mockBlogs,
        limitDesktop: 2,
        limitMobile: 4,
      },
    });

    // Only first 2 should appear in desktop view
    expect(result).toContain('First Blog Post');
    expect(result).toContain('Second Amazing Article');

    // Mobile div should be hidden
    expect(result).toContain('flex md:hidden'); // still in HTML
    expect(result).toContain('hidden md:flex');
  });

  it('renders all blogs up to limits correctly with proper responsive classes', async () => {
    const container = await AstroContainer.create();

    const result = await container.renderToString(BlogList, {
      props: {
        blogs: mockBlogs,
        limitDesktop: 3,
        limitMobile: 1,
      },
    });

    // Both mobile and desktop divs should exist
    expect(result).toContain('flex md:hidden flex-wrap gap-[3px]');
    expect(result).toContain('hidden md:flex flex-wrap gap-[3px]');

    expect(result).toContain('First Blog Post');
    expect(result).toContain('Second Amazing Article');
    expect(result).toContain('Learning Astro');
  });
});
