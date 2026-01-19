import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import QuantityInput from '..';

// =====================
// Mocks
// =====================
vi.mock('@/ui', () => ({
  Input: ({
    value,
    onChange,
    onBlur,
    onKeyDown,
    ...props
  }: {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    [key: string]: unknown;
  }) => (
    <input
      data-testid="quantity-input"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      {...props}
    />
  ),
}));

vi.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

// =====================
// Tests
// =====================
describe('QuantityInput', () => {
  it('renders input with correct initial value', () => {
    render(<QuantityInput value={2} onChange={vi.fn()} />);

    const input = screen.getByTestId('quantity-input') as HTMLInputElement;

    expect(input.value).toBe('2');
  });

  it('updates internal value when typing but does NOT call onChange yet', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={1} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '3' } });

    expect(input.value).toBe('3');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with new value when input is blurred', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={1} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.blur(input);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange when pressing Enter key', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={1} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('does NOT call onChange if committed value is same as current value', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={2} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input');

    fireEvent.change(input, { target: { value: '2' } });
    fireEvent.blur(input);

    expect(onChange).not.toHaveBeenCalled();
  });

  it('calls onChange with 0 when input is cleared (browser number input behavior)', () => {
    const onChange = vi.fn();

    render(<QuantityInput value={5} onChange={onChange} />);

    const input = screen.getByTestId('quantity-input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);

    expect(input.value).toBe('');
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('applies custom className', () => {
    render(<QuantityInput value={1} className="custom-class" onChange={vi.fn()} />);

    const input = screen.getByTestId('quantity-input');

    expect(input).toHaveClass('custom-class');
  });

  it('passes disabled prop to input', () => {
    render(<QuantityInput value={1} disabled onChange={vi.fn()} />);

    const input = screen.getByTestId('quantity-input');

    expect(input).toBeDisabled();
  });
});
