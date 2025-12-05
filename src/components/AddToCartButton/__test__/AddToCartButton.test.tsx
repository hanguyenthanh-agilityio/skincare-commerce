import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

// Component
import AddToCartButton from '..';

describe('AddToCartButton component', () => {
  // TODO: not remove - use productId when handle logic add to cart
  // const mockProductId = 'product-123';

  it('render matching snapshot', () => {
    const container = render(<AddToCartButton />);

    expect(container).toMatchSnapshot();
  });

  it('should handle rapid clicks correctly', async () => {
    render(<AddToCartButton />);

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(button).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Add to your cart');
  });

  it('should merge custom className with default classes', () => {
    render(<AddToCartButton className="custom-class" />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
    expect(button).toHaveClass('custom-class');
  });

  it('should not be disabled initially', () => {
    render(<AddToCartButton />);

    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should change text to "Added!" after click', () => {
    render(<AddToCartButton />);

    const button = screen.getByRole('button');
    expect(button).toHaveContentBlock('Add to your cart');

    fireEvent.click(button);

    expect(button).toHaveContentBlock('Added!');
  });

  it('should disable button after click', () => {
    render(<AddToCartButton />);

    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    expect(button).toBeDisabled();
  });

  it('should update isAdding state on click', () => {
    render(<AddToCartButton />);

    const button = screen.getByRole('button');

    // Initial state
    expect(button).toHaveContentBlock('Add to your cart');
    expect(button).not.toBeDisabled();

    // After click
    fireEvent.click(button);
    expect(button).toHaveContentBlock('Added!');
    expect(button).toBeDisabled();
  });
});
