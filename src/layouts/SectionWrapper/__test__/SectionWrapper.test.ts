import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { expect, it, describe } from 'vitest';

// Components
import { SectionWrapper } from '@/layouts';

describe('SectionWrapper component', () => {
  const defaultProps = {
    title: 'Powerful Features for Modern Teams',
    subtitle: 'New Release',
    description:
      'Discover the latest tools designed to boost productivity and streamline collaboration across your organization.',
    ctaLabel: 'Explore Documentation',
    ctaHref: '/docs/getting-started',
  };

  it('renders all text content correctly', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionWrapper, {
      props: defaultProps,
    });

    expect(result).toContain('New Release');
    expect(result).toContain('Powerful Features for Modern Teams');
    expect(result).toContain('Discover the latest tools designed to boost productivity');
    expect(result).toContain('Explore Documentation');
  });

  it('renders default slot content when provided', async () => {
    const container = await AstroContainer.create();
    const result = await container.renderToString(SectionWrapper, {
      props: defaultProps,
      slots: {
        default:
          '<div class="grid grid-cols-3 gap-6"><p>Feature Card 1</p><p>Feature Card 2</p></div>',
      },
    });

    expect(result).toContain('Feature Card 1');
    expect(result).toContain('Feature Card 2');
    expect(result).toContain('grid grid-cols-3 gap-6');
  });
});
