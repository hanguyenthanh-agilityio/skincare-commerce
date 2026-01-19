import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import PaginationControls from '..';

vi.mock('@/lib', () => ({
  cn: (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(' '),
}));

vi.mock('@/ui/Pagination', () => ({
  Pagination: ({ children }: { children: React.ReactNode }) => (
    <nav aria-label="pagination">{children}</nav>
  ),
  PaginationContent: ({ children }: { children: React.ReactNode }) => <ul>{children}</ul>,
  PaginationItem: ({ children }: { children: React.ReactNode }) => <li>{children}</li>,
  PaginationLink: ({
    children,
    href,
    isActive,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    isActive?: boolean;
    [key: string]: unknown;
  }) => (
    <a href={href} data-active={isActive ? 'true' : 'false'} {...props}>
      {children}
    </a>
  ),
  PaginationPrevious: ({ href, ...props }: { href: string; [key: string]: unknown }) => (
    <a href={href} aria-label="Previous page" {...props}>
      Previous
    </a>
  ),
  PaginationNext: ({ href, ...props }: { href: string; [key: string]: unknown }) => (
    <a href={href} aria-label="Next page" {...props}>
      Next
    </a>
  ),
}));

describe('PaginationControls', () => {
  it('returns null when pageCount <= 1', () => {
    const { container } = render(<PaginationControls page={1} pageCount={1} />);

    expect(container.firstChild).toBeNull();
  });

  it('renders pagination with correct number of pages', () => {
    render(<PaginationControls page={1} pageCount={3} />);

    expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('marks current page as active', () => {
    render(<PaginationControls page={2} pageCount={3} />);

    const activeLink = screen.getByText('2');
    expect(activeLink).toHaveAttribute('data-active', 'true');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });

  it('sets correct href for page links', () => {
    render(<PaginationControls page={1} pageCount={3} />);

    expect(screen.getByText('1')).toHaveAttribute('href', '?page=1');
    expect(screen.getByText('2')).toHaveAttribute('href', '?page=2');
    expect(screen.getByText('3')).toHaveAttribute('href', '?page=3');
  });

  it('disables Previous button on first page', () => {
    render(<PaginationControls page={1} pageCount={3} />);

    const prev = screen.getByLabelText('Previous page');
    expect(prev).toHaveAttribute('aria-disabled', 'true');
    expect(prev).not.toHaveAttribute('href');
  });

  it('disables Next button on last page', () => {
    render(<PaginationControls page={3} pageCount={3} />);

    const next = screen.getByLabelText('Next page');
    expect(next).toHaveAttribute('aria-disabled', 'true');
    expect(next).not.toHaveAttribute('href');
  });

  it('enables Previous and Next buttons on middle page', () => {
    render(<PaginationControls page={2} pageCount={3} />);

    const prev = screen.getByLabelText('Previous page');
    const next = screen.getByLabelText('Next page');

    expect(prev).toHaveAttribute('href', '?page=1');
    expect(next).toHaveAttribute('href', '?page=3');
  });

  it('normalizes page number lower than 1', () => {
    render(<PaginationControls page={0} pageCount={3} />);

    const activeLink = screen.getByText('1');
    expect(activeLink).toHaveAttribute('aria-current', 'page');
  });
});
