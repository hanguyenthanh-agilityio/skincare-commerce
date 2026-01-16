import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartHeaderRow } from '@/components';

describe('CartHeaderRow', () => {
  const columns = [
    { title: 'Product' },
    { title: 'Price', className: 'text-right' },
    { title: 'Quantity', className: 'text-center' },
    { title: 'Total', className: 'text-right' },
  ];

  it('renders all column titles', () => {
    render(<CartHeaderRow columns={columns} />);

    columns.forEach(({ title }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it('renders the correct number of columns', () => {
    render(<CartHeaderRow columns={columns} />);

    const renderedColumns = screen.getAllByText(/Product|Price|Quantity|Total/);

    expect(renderedColumns).toHaveLength(columns.length);
  });

  it('applies custom className to each column', () => {
    render(<CartHeaderRow columns={columns} />);

    columns.forEach(({ title, className }) => {
      if (!className) return;

      const column = screen.getByText(title);
      expect(column).toHaveClass(className);
    });
  });

  it('renders header container with correct layout classes', () => {
    const { container } = render(<CartHeaderRow columns={columns} />);

    const headerRow = container.firstChild as HTMLElement;

    expect(headerRow).toHaveClass(
      'grid',
      'border-b',
      'pb-3',
      'text-sm',
      'text-muted-foreground',
      'uppercase',
    );
  });
});
