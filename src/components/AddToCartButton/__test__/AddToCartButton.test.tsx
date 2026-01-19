/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach, afterAll } from 'vitest';
import type { MockedFunction } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Component
import AddToCartButton from '..';

// Mock API service
vi.mock('@/services', () => ({
  apiClient: {
    post: vi.fn(),
  },
}));

// Mock toast
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(() => 'toast-id'),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock i18n
vi.mock('@/i18n', () => ({
  buildRoute: () => '/login',
  loadContent: () => ({
    ctaLabel: 'Add to your cart',
    loading: { label: 'Adding...' },
    addSuccess: {
      title: 'Added',
      description: 'Product added successfully',
    },
    addFailed: {
      title: 'Failed',
      description: 'Something went wrong',
    },
  }),
}));

import { apiClient } from '@/services';
import { toast } from 'sonner';

describe('AddToCartButton', () => {
  const originalLocation = window.location;

  const mockPost = apiClient.post as MockedFunction<typeof apiClient.post>;

  beforeEach(() => {
    vi.clearAllMocks();

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { href: '' },
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
    });
  });

  const renderComponent = (props?: Partial<React.ComponentProps<typeof AddToCartButton>>) =>
    render(<AddToCartButton productDocumentId="product-123" locale="en" {...props} />);

  it('renders add to cart button', () => {
    renderComponent();

    const button = screen.getByRole('button', {
      name: /add to your cart/i,
    });

    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('disables button and shows loading text after click', async () => {
    mockPost.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent(/adding/i);
    });

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(toast.loading).toHaveBeenCalled();
  });

  it('returns early if already adding', async () => {
    let resolvePromise!: () => void;

    mockPost.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePromise = () =>
            resolve({
              data: {},
              error: null,
            });
        }),
    );

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).toBeDisabled();
    });

    fireEvent.click(button);

    expect(mockPost).toHaveBeenCalledTimes(1);

    resolvePromise();
  });

  it('calls add to cart API with correct payload', async () => {
    mockPost.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/api/cart/add', {
        body: {
          productDocumentId: 'product-123',
        },
      });
    });
  });

  it('shows error toast when API returns error', async () => {
    mockPost.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: 'SOMETHING_WENT_WRONG',
      },
    } as any);

    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Failed',
        expect.objectContaining({
          description: 'Something went wrong',
          id: 'toast-id',
        }),
      );
    });
  });

  it('redirects to login when unauthorized', async () => {
    mockPost.mockResolvedValueOnce({
      data: undefined,
      error: {
        message: 'UNAUTHORIZED',
      },
    } as any);

    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(window.location.href).toBe('/login');
    });
  });

  it('shows success toast when add to cart succeeds', async () => {
    mockPost.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderComponent();

    fireEvent.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        'Added',
        expect.objectContaining({
          description: 'Product added successfully',
          id: 'toast-id',
        }),
      );
    });
  });

  it('re-enables button after request finishes', async () => {
    mockPost.mockResolvedValueOnce({
      data: {},
      error: null,
    });

    renderComponent();

    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(button).toHaveTextContent(/add to your cart/i);
    });
  });

  it('merges custom className', () => {
    renderComponent({ className: 'custom-class' });

    const button = screen.getByRole('button');

    expect(button).toHaveClass('custom-class');
  });
});
