import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

// Components
import { Heading as Element } from '..';

describe('Heading Component', () => {
  it('renders correct element based on variant', () => {
    render(<Element variant="h3">Test Heading</Element>);
    const element = screen.getByText('Test Heading');

    expect(element.tagName.toLowerCase()).toBe('h3');
  });

  it('applies default variant h2 when not provided', () => {
    render(<Element>Default Heading</Element>);
    const element = screen.getByText('Default Heading');

    expect(element.tagName.toLowerCase()).toBe('h2');
  });

  it('applies correct className styles for variant', () => {
    render(<Element variant="h1">Styled Heading</Element>);
    const element = screen.getByText('Styled Heading');

    expect(element.className).toContain('text-4xl'); // h1 style
  });

  it('merges custom className with default styles', () => {
    render(
      <Element variant="h4" className="custom-class">
        Custom Heading
      </Element>,
    );
    const element = screen.getByText('Custom Heading');

    expect(element.className).toContain('text-lg');
    expect(element.className).toContain('custom-class');
  });

  it('renders children correctly', () => {
    render(<Element variant="h5">Hello World</Element>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
