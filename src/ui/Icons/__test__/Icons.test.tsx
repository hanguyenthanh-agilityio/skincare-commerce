import { render, screen } from '@testing-library/react';
import { Icons } from '..';

describe('Icons', () => {
  it('renders Arrow icon correctly', () => {
    render(<Icons.Arrow data-testid="arrow-icon" />);
    const icon = screen.getByTestId('arrow-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  it('renders Hamburger icon correctly', () => {
    render(<Icons.Hamburger data-testid="hamburger-icon" />);
    const icon = screen.getByTestId('hamburger-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('renders Cart icon correctly', () => {
    render(<Icons.Cart data-testid="cart-icon" />);
    const icon = screen.getByTestId('cart-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
    expect(icon).toHaveAttribute('width', '14');
    expect(icon).toHaveAttribute('height', '14');
  });

  it('renders User icon correctly', () => {
    render(<Icons.User data-testid="user-icon" />);
    const icon = screen.getByTestId('user-icon');
    expect(icon).toBeInTheDocument();
    expect(icon.tagName).toBe('svg');
    expect(icon).toHaveAttribute('width', '14');
    expect(icon).toHaveAttribute('height', '14');
  });

  it('accepts additional props like className', () => {
    render(<Icons.Arrow data-testid="arrow-icon" className="test-class" />);
    const icon = screen.getByTestId('arrow-icon');
    expect(icon).toHaveClass('test-class');
  });
});
