import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import DrawerMenuItem from '..';

// Mock LinkWrapper
vi.mock('@/components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components')>();

  return {
    ...actual,
    LinkWrapper: ({
      href,
      children,
      className,
    }: {
      href: string;
      children: React.ReactNode;
      className?: string;
    }) => (
      <a href={href} className={className}>
        {children}
      </a>
    ),
  };
});

// Mock Button
vi.mock('@/ui', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/ui')>();

  return {
    ...actual,
    Button: ({
      children,
      onClick,
      className,
    }: {
      children: React.ReactNode;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
      className?: string;
    }) => (
      <button onClick={onClick} className={className}>
        {children}
      </button>
    ),
  };
});

describe('DrawerMenuItem', () => {
  it('renders label', () => {
    render(<DrawerMenuItem label="Account" />);

    expect(screen.getByText('Account')).toBeInTheDocument();
  });

  it('renders link when href is provided', () => {
    render(<DrawerMenuItem label="Shop" href="/shop" />);

    const link = screen.getByRole('link', { name: 'Shop' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/shop');
  });

  it('renders button when href is not provided', () => {
    render(<DrawerMenuItem label="Logout" onClick={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('calls onClick when button is clicked', () => {
    const onClick = vi.fn();

    render(<DrawerMenuItem label="Logout" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Logout' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders arrow icon when hasArrow is true', () => {
    render(<DrawerMenuItem label="Categories" hasArrow />);

    expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
  });

  it('does not render arrow icon when hasArrow is false', () => {
    render(<DrawerMenuItem label="Categories" />);

    expect(screen.queryByTestId('chevron-icon')).not.toBeInTheDocument();
  });
});
