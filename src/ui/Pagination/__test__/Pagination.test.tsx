import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/ui/Pagination';

describe('Pagination component', () => {
  it('renders navigation wrapper', () => {
    render(<Pagination />);

    const nav = screen.getByRole('navigation');

    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'pagination');
    expect(nav).toHaveAttribute('data-slot', 'pagination');
  });

  it('merges custom className', () => {
    render(<Pagination className="custom-class" />);

    const nav = screen.getByRole('navigation');

    expect(nav).toHaveClass('custom-class');
  });
});

describe('PaginationContent', () => {
  it('renders ul container', () => {
    render(
      <PaginationContent>
        <li>1</li>
      </PaginationContent>,
    );

    const ul = screen.getByRole('list');

    expect(ul).toHaveAttribute('data-slot', 'pagination-content');
  });
});

describe('PaginationItem', () => {
  it('renders li with slot', () => {
    render(
      <PaginationItem>
        <a>1</a>
      </PaginationItem>,
    );

    const li = screen.getByText('1').closest('li');

    expect(li).toHaveAttribute('data-slot', 'pagination-item');
  });
});

describe('PaginationLink', () => {
  it('renders as anchor', () => {
    render(<PaginationLink href="#">1</PaginationLink>);

    const link = screen.getByText('1');

    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('data-slot', 'pagination-link');
  });

  it('sets active state correctly', () => {
    render(<PaginationLink isActive>1</PaginationLink>);

    const link = screen.getByText('1');

    expect(link).toHaveAttribute('aria-current', 'page');
    expect(link).toHaveAttribute('data-active', 'true');
  });

  it('merges custom className', () => {
    render(<PaginationLink className="custom-link">1</PaginationLink>);

    const link = screen.getByText('1');

    expect(link).toHaveClass('custom-link');
  });
});

describe('PaginationPrevious', () => {
  it('renders previous button', () => {
    render(<PaginationPrevious />);

    const prev = screen.getByLabelText('Go to previous page');

    expect(prev).toBeInTheDocument();
    expect(prev).toHaveAttribute('data-slot', 'pagination-link');
  });
});

describe('PaginationNext', () => {
  it('renders next button', () => {
    render(<PaginationNext />);

    const next = screen.getByLabelText('Go to next page');

    expect(next).toBeInTheDocument();
    expect(next).toHaveAttribute('data-slot', 'pagination-link');
  });
});

describe('PaginationEllipsis', () => {
  it('renders ellipsis with sr-only text', () => {
    render(<PaginationEllipsis />);

    const srText = screen.getByText('More pages');

    expect(srText).toBeInTheDocument();

    const ellipsis = srText.parentElement;
    expect(ellipsis).toHaveAttribute('data-slot', 'pagination-ellipsis');
    expect(ellipsis).toHaveAttribute('aria-hidden');
  });

  it('merges className', () => {
    render(<PaginationEllipsis className="custom-ellipsis" />);

    const srText = screen.getByText('More pages');
    const ellipsis = srText.parentElement;

    expect(ellipsis).toHaveClass('custom-ellipsis');
  });
});

describe('Pagination integration', () => {
  it('renders a full pagination layout', () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('1')).toHaveAttribute('aria-current', 'page');
    expect(screen.getByLabelText('Go to previous page')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to next page')).toBeInTheDocument();
    expect(screen.getByText('More pages')).toBeInTheDocument();
  });
});
