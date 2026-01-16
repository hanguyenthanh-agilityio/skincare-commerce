import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FaqAccordion from '.';

// Mock UI components
vi.mock('@/ui', () => ({
  Accordion: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion">{children}</div>
  ),
  AccordionItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="accordion-item">{children}</div>
  ),
  AccordionTrigger: ({ children }: { children: React.ReactNode }) => (
    <button type="button">{children}</button>
  ),
  AccordionContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

// Mock LinkWrapper
vi.mock('@/components', () => ({
  LinkWrapper: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockSections = [
  {
    id: 'shipping',
    title: 'Shipping Information',
    items: [
      {
        label: 'Shipping Policy',
        href: '/shipping-policy',
      },
      {
        label: 'Delivery Time',
        href: '/delivery-time',
      },
    ],
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    items: [
      {
        label: 'Return Policy',
        href: '/return-policy',
      },
    ],
  },
];

describe('FaqAccordion', () => {
  it('renders accordion container', () => {
    render(<FaqAccordion sections={mockSections} />);

    expect(screen.getByTestId('accordion')).toBeInTheDocument();
  });

  it('renders all section titles', () => {
    render(<FaqAccordion sections={mockSections} />);

    expect(screen.getByRole('button', { name: 'Shipping Information' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Returns & Refunds' })).toBeInTheDocument();
  });

  it('renders all FAQ links', () => {
    render(<FaqAccordion sections={mockSections} />);

    expect(screen.getByText('Shipping Policy')).toBeInTheDocument();
    expect(screen.getByText('Delivery Time')).toBeInTheDocument();
    expect(screen.getByText('Return Policy')).toBeInTheDocument();
  });

  it('renders links with correct href', () => {
    render(<FaqAccordion sections={mockSections} />);

    const shippingLink = screen.getByText('Shipping Policy');
    expect(shippingLink.closest('a')).toHaveAttribute('href', '/shipping-policy');

    const returnLink = screen.getByText('Return Policy');
    expect(returnLink.closest('a')).toHaveAttribute('href', '/return-policy');
  });

  it('renders correct number of accordion items', () => {
    render(<FaqAccordion sections={mockSections} />);

    const items = screen.getAllByTestId('accordion-item');
    expect(items).toHaveLength(2);
  });
});
