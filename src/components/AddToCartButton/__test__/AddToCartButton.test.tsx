import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Component
import AddToCartButton from '..';

// Mock services
vi.mock('@/services', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

import { apiClient } from '@/services';

describe('AddToCartButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = (props?: Partial<React.ComponentProps<typeof AddToCartButton>>) => {
    return render(<AddToCartButton productDocumentId="product-123" locale="en" {...props} />);
  };

  it('renders Add to cart button', () => {
    renderComponent();

    const button = screen.getByRole('button', {
      name: /add to your cart/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('disables button and shows loading text after click', async () => {
    (
      apiClient.post as unknown as { mockResolvedValueOnce: (val: unknown) => void }
    ).mockResolvedValueOnce({});

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/adding/i);
    });

    expect(apiClient.post).toHaveBeenCalledTimes(1);
  });

  it('prevents rapid multiple clicks', async () => {
    (
      apiClient.post as unknown as { mockResolvedValueOnce: (val: unknown) => void }
    ).mockResolvedValueOnce({});

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(apiClient.post).toHaveBeenCalledTimes(1);
    });
  });

  it('merges custom className', () => {
    renderComponent({ className: 'custom-class' });

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });

  it('calls add to cart API with correct payload', async () => {
    (
      apiClient.post as unknown as { mockResolvedValueOnce: (val: unknown) => void }
    ).mockResolvedValueOnce({});

    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith('/api/cart/add', {
        body: {
          productDocumentId: 'product-123',
        },
      });
    });
  });

  it('re-enables button after request finishes', async () => {
    (
      apiClient.post as unknown as { mockResolvedValueOnce: (val: unknown) => void }
    ).mockResolvedValueOnce({});

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent(/add to your cart/i);
    });
  });
});
