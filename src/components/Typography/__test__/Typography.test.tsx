import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Components
import { Typography } from '..';

describe('Typography Component', () => {
  it('renders <p> tag by default', () => {
    render(<Typography>Default paragraph</Typography>);
    const element = screen.getByText('Default paragraph');

    expect(element.tagName.toLowerCase()).toBe('p');
  });

  it('renders <span> when variant="span"', () => {
    render(<Typography variant="span">Span text</Typography>);
    const element = screen.getByText('Span text');

    expect(element.tagName.toLowerCase()).toBe('span');
  });

  it('applies default paragraph styles', () => {
    render(<Typography>Paragraph text</Typography>);
    const element = screen.getByText('Paragraph text');

    expect(element.className).toContain('text-base/7');
  });

  it('applies xs paragraph styles when paragraphSize="xs"', () => {
    render(<Typography paragraphSize="xs">Small paragraph</Typography>);
    const element = screen.getByText('Small paragraph');

    expect(element.className).toContain('text-sm/6');
    expect(element.className).toContain('font-bold');
  });

  it('applies default span styles when variant="span"', () => {
    render(<Typography variant="span">Span default</Typography>);
    const element = screen.getByText('Span default');

    expect(element.className).toContain('text-sm/6');
  });

  it('applies xs spanSize when variant="span" and spanSize="xs"', () => {
    render(
      <Typography variant="span" spanSize="xs">
        Small span
      </Typography>,
    );
    const element = screen.getByText('Small span');

    expect(element.className).toContain('text-xs');
  });

  it('merges custom className correctly', () => {
    render(<Typography className="custom-class">With class</Typography>);
    const element = screen.getByText('With class');

    expect(element.className).toContain('custom-class');
  });

  it('renders children correctly', () => {
    render(<Typography>Hello world</Typography>);
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });
});
