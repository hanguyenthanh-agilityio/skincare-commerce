import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import QuantityInput from '..';

// Mock Input component
vi.mock('@/ui', () => ({
  Input: ({
    value,
    onChange,
    ...props
  }: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    [key: string]: unknown;
  }) => <input data-testid="quantity-input" value={value} onChange={onChange} {...props} />,
}));

// Mock cn utility
vi.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

describe('QuantityInput', () => {
  it('renders input with correct value', () => {
    render(<QuantityInput value={2} onChange={vi.fn()} />);

    const input = screen.getByTestId('quantity-input') as HTMLInputElement;
    expect(input.value).toBe('2');
  });

  it('calls onChange with new value when input changes', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={1} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '3' } });

    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not allow value lower than min', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={2} min={1} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '0' } });

    expect(onChange).toHaveBeenCalledWith(1);
  });

  it('does not allow value greater than max', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={2} min={1} max={5} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '10' } });

    expect(onChange).toHaveBeenCalledWith(5);
  });

  it('applies custom className', () => {
    render(<QuantityInput value={1} className="custom-class" onChange={vi.fn()} />);

    const input = screen.getByTestId('quantity-input');

    expect(input).toHaveClass('custom-class');
  });
});
