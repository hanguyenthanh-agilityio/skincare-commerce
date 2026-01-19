import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { Toaster } from '@/ui';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'dark',
  }),
}));

const sonnerMock = vi.fn();

vi.mock('sonner', () => ({
  Toaster: (props: Record<string, unknown>) => {
    sonnerMock(props);

    return <div data-testid="sonner-toaster" {...props} />;
  },
}));

describe('Toaster', () => {
  beforeEach(() => {
    sonnerMock.mockClear();
  });

  it('renders Sonner toaster', () => {
    render(<Toaster />);

    expect(screen.getByTestId('sonner-toaster')).toBeInTheDocument();
  });

  it('passes theme from next-themes', () => {
    render(<Toaster />);

    expect(sonnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        theme: 'dark',
      }),
    );
  });

  it('applies default className', () => {
    render(<Toaster />);

    expect(sonnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        className: 'toaster group',
      }),
    );
  });

  it('passes CSS variables via style prop', () => {
    render(<Toaster />);

    expect(sonnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        style: {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
          '--border-radius': 'var(--radius)',
        },
      }),
    );
  });

  it('provides custom icons', () => {
    render(<Toaster />);

    expect(sonnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        icons: {
          success: expect.anything(),
          info: expect.anything(),
          warning: expect.anything(),
          error: expect.anything(),
          loading: expect.anything(),
        },
      }),
    );
  });

  it('forwards additional props', () => {
    render(<Toaster position="top-right" duration={4000} />);

    expect(sonnerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        position: 'top-right',
        duration: 4000,
      }),
    );
  });
});
