import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Input } from '@/ui/Input';

describe('Input component', () => {
  it('renders an input element', () => {
    render(<Input data-testid="input" />);

    const input = screen.getByTestId('input');
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

  it('renders helpText using TypographyWrapper', () => {
    render(<Input helpText="This is help text" />);

    const helpText = screen.getByText('This is help text');
    expect(helpText).toBeInTheDocument();
    expect(helpText.tagName.toLowerCase()).toBe('span');
  });

  it('forwards props to input', () => {
    render(<Input placeholder="Enter name" defaultValue="John" data-testid="input" />);

    const input = screen.getByTestId('input') as HTMLInputElement;
    expect(input.placeholder).toBe('Enter name');
    expect(input.value).toBe('John');
  });

  it('applies type attribute correctly (password)', () => {
    render(<Input type="password" data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('applies custom className', () => {
    render(<Input className="my-custom-class" data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('my-custom-class');
  });

  it('supports disabled state', () => {
    render(<Input disabled data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toBeDisabled();
  });

  it('applies error styles when isInvalid=true', () => {
    render(<Input isInvalid data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input.className).toContain('text-red-400');
    expect(input.className).toContain('border-red-400');
  });

  it('renders errorMessage and applies error styles', () => {
    render(<Input errorMessage="Required field" data-testid="input" />);

    const input = screen.getByTestId('input');
    const errorText = screen.getByText('Required field');

    expect(errorText).toBeInTheDocument();
    expect(errorText.tagName.toLowerCase()).toBe('span');
    expect(errorText).toHaveClass('text-red-400');

    expect(input.className).toContain('text-red-400');
    expect(input.className).toContain('border-red-400');
  });

  it('supports aria-invalid attribute', () => {
    render(<Input aria-invalid="true" data-testid="input" />);

    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });
});
