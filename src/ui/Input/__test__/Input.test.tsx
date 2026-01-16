import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Input } from '@/ui/Input';

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input />);

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('data-slot', 'input');
  });

  it('renders label when provided', () => {
    render(<Input id="email" label="Email" />);

    const label = screen.getByText('Email');
    const input = screen.getByRole('textbox');

    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('does not render label when not provided', () => {
    render(<Input />);

    expect(screen.queryByText(/email/i)).not.toBeInTheDocument();
  });

  it('forwards props to input', () => {
    render(<Input placeholder="Enter name" defaultValue="John" data-testid="input" />);

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter name');
    expect(input.value).toBe('John');
  });

  it('applies type attribute', () => {
    render(<Input type="password" />);

    const input = screen.getByDisplayValue('') || screen.getByRole('textbox', { hidden: true });
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    render(<Input className="my-custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('my-custom-class');
  });

  it('supports disabled state', () => {
    render(<Input disabled />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('supports aria-invalid styling', () => {
    render(<Input aria-invalid="true" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    // class từ tailwind được gắn sẵn
    expect(input.className).toMatch(/aria-invalid/);
  });
});
