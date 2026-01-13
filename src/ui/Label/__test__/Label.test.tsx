import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

// Components
import { Label } from '@/ui/Label';

describe('Label component', () => {
  it('renders a label element', () => {
    render(<Label>Email</Label>);

    const label = screen.getByText('Email');

    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveAttribute('data-slot', 'label');
  });

  it('forwards props correctly', () => {
    render(
      <Label htmlFor="email" data-testid="label">
        Email
      </Label>,
    );

    const label = screen.getByTestId('label');

    expect(label).toHaveAttribute('for', 'email');
  });

  it('applies default styling classes', () => {
    render(<Label>Email</Label>);

    const label = screen.getByText('Email');

    expect(label.className).toMatch(/text-sm/);
    expect(label.className).toMatch(/font-medium/);
    expect(label.className).toMatch(/select-none/);
  });

  it('merges custom className', () => {
    render(<Label className="my-custom-class">Email</Label>);

    const label = screen.getByText('Email');

    expect(label).toHaveClass('my-custom-class');
  });

  it('respects peer-disabled styles', () => {
    render(
      <div>
        <input id="email" disabled className="peer" />
        <Label htmlFor="email">Email</Label>
      </div>,
    );

    const label = screen.getByText('Email');

    // Radix + tailwind dùng peer-disabled:* classes
    expect(label.className).toMatch(/peer-disabled/);
  });

  it('respects group disabled styles', () => {
    render(
      <div data-disabled="true" className="group">
        <Label>Email</Label>
      </div>,
    );

    const label = screen.getByText('Email');

    expect(label.className).toMatch(/group-data/);
  });
});
