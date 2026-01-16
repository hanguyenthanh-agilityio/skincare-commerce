import { CartSummary } from '@/components';
import { render, screen } from '@testing-library/react';

describe('CartSummary', () => {
  const props = {
    total: '120',
    label: 'Order Summary',
    shippingNote: 'Shipping calculated at checkout',
    checkoutText: 'Proceed to Checkout',
  };

  it('renders label and total correctly', () => {
    render(<CartSummary {...props} />);

    expect(screen.getByText('Order Summary')).toBeInTheDocument();
    expect(screen.getByText('$120')).toBeInTheDocument();
  });

  it('renders shipping note', () => {
    render(<CartSummary {...props} />);

    expect(screen.getByText('Shipping calculated at checkout')).toBeInTheDocument();
  });

  it('sets correct aria-label for checkout button', () => {
    render(<CartSummary {...props} />);

    expect(
      screen.getByRole('button', {
        name: 'Proceed to Checkout, total $120',
      }),
    ).toBeInTheDocument();
  });

  it('links to checkout page', () => {
    render(<CartSummary {...props} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/checkout');
  });
});
