import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Component
import AddToCartButton from '..';

describe('AddToCartButton component', () => {
  const mockProductId = 'product-123';

  it('render matching snapshot', () => {
    const container = render(<AddToCartButton productId={mockProductId} />);

    expect(container).toMatchSnapshot();
  });

  it('should handle rapid clicks correctly', async () => {
    render(<AddToCartButton productId={mockProductId} />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Add to your cart');
  });

  it('should merge custom className with default classes', () => {
    render(<AddToCartButton productId={mockProductId} className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('custom-class');
  });

  it('should not be disabled initially', () => {
    render(<AddToCartButton productId={mockProductId} />);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should change text to "Added!" after click', () => {
    render(<AddToCartButton productId={mockProductId} />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Add to your cart');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Added!');
  });

  it('should disable button after click', () => {
    render(<AddToCartButton productId={mockProductId} />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('should update isAdding state on click', () => {
    render(<AddToCartButton productId={mockProductId} />);

    const button = screen.getByRole('button');

    // Initial state
    expect(button).toHaveTextContent('Add to your cart');
    expect(button).not.toBeDisabled();

    // After click
    fireEvent.click(button);
    expect(button).toHaveTextContent('Added!');
    expect(button).toBeDisabled();
  });
});
