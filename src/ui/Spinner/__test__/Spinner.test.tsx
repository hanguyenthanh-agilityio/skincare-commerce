import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Spinner } from '@/ui';

describe('Spinner', () => {
  it('renders correctly', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
  });

  it('has accessible aria-label', () => {
    render(<Spinner />);

    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies default classes', () => {
    render(<Spinner />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('size-4');
    expect(spinner).toHaveClass('animate-spin');
  });

  it('merges custom className', () => {
    render(<Spinner className="text-red-500" />);

    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('text-red-500');
    expect(spinner).toHaveClass('animate-spin');
  });

  it('forwards extra props to svg element', () => {
    render(<Spinner data-testid="spinner" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
