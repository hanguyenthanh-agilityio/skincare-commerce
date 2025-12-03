import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// UI
import { Button, buttonVariants } from '@/ui';

describe('Button component', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('applies default variant and size classes', () => {
    render(<Button>Default</Button>);
    const btn = screen.getByText('Default');
    const expectedClass = buttonVariants({ variant: 'default', size: 'default' });
    expect(btn).toHaveClass(expectedClass);
  });

  it('renders as child element with Slot', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>,
    );
    const link = screen.getByText('Link Button');
    expect(link.tagName).toBe('A');
    expect(link).toHaveClass(buttonVariants({ variant: 'default', size: 'default' }));
  });
});
