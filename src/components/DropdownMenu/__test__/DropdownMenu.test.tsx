/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DropdownMenu from '..';

vi.mock('@/ui', () => ({
  NavigationMenu: ({ children, className }: any) => (
    <nav data-testid="navigation-menu" className={className}>
      {children}
    </nav>
  ),

  NavigationMenuList: ({ children }: any) => <ul>{children}</ul>,
  NavigationMenuItem: ({ children }: any) => <li>{children}</li>,

  NavigationMenuTrigger: ({ children }: any) => <button type="button">{children}</button>,

  NavigationMenuContent: ({ children }: any) => <div data-testid="menu-content">{children}</div>,

  NavigationMenuViewport: () => <div data-testid="menu-viewport" />,
}));

vi.mock('@/components', () => ({
  LinkWrapper: ({ href, children }: any) => <a href={href}>{children}</a>,

  StrapiImage: () => <div data-testid="strapi-image" />,
}));

vi.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const mockData = [
  {
    title: 'Shop',
    imageUrl: '/image.jpg',
    columns: [
      {
        heading: 'Category',
        items: [
          { label: 'Skincare', href: '/skincare' },
          { label: 'Makeup', href: '/makeup' },
        ],
      },
    ],
  },
];

describe('DropdownMenu', () => {
  it('returns null when data is empty', () => {
    const { container } = render(<DropdownMenu data={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders navigation menu wrapper', () => {
    render(<DropdownMenu data={mockData} />);

    expect(screen.getByTestId('navigation-menu')).toBeInTheDocument();
  });

  it('renders menu trigger title', () => {
    render(<DropdownMenu data={mockData} />);

    expect(screen.getByRole('button', { name: 'Shop' })).toBeInTheDocument();
  });

  it('renders column heading', () => {
    render(<DropdownMenu data={mockData} />);

    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders submenu links with correct href', () => {
    render(<DropdownMenu data={mockData} />);

    const skincare = screen.getByText('Skincare').closest('a');
    const makeup = screen.getByText('Makeup').closest('a');

    expect(skincare).toHaveAttribute('href', '/skincare');
    expect(makeup).toHaveAttribute('href', '/makeup');
  });

  it('renders Strapi image', () => {
    render(<DropdownMenu data={mockData} />);

    expect(screen.getByTestId('strapi-image')).toBeInTheDocument();
  });

  it('applies custom className to navigation menu', () => {
    render(<DropdownMenu data={mockData} className="custom-class" />);

    expect(screen.getByTestId('navigation-menu')).toHaveClass('custom-class');
  });
});
