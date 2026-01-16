import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DrawerMenu from '..';

import type { MenuItem, NavLink } from '@/types';

/* -------------------------------------------------------------------------- */
/*                                   MOCK UI                                  */
/* -------------------------------------------------------------------------- */

// Mock UI (Radix Sheet + Button + Icons)
vi.mock('@/ui', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    props: Record<string, unknown>;
  }) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
  Icons: {
    Hamburger: () => <span data-testid="hamburger-icon" />,
    Logo: () => <span data-testid="logo-icon" />,
  },
}));

// Mock components
vi.mock('@/components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components')>();

  return {
    ...actual,
    DrawerMenuItem: ({
      label,
      onClick,
    }: {
      label: string;
      onClick?: React.MouseEventHandler<HTMLButtonElement>;
    }) => <button onClick={onClick}>{label}</button>,
    LinkWrapper: ({ href, children }: { href: string; children: React.ReactNode }) => (
      <a href={href}>{children}</a>
    ),
  };
});

const mockMenuData: MenuItem[] = [
  {
    title: 'Shop',
    columns: [
      {
        heading: 'Category',
        items: [
          { label: 'Cleanser', href: '/cleanser' },
          { label: 'Toner', href: '/toner' },
        ],
      },
    ],
    imageUrl: '',
  },
];

const mockNavLinks: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

describe('DrawerMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders hamburger button', () => {
    render(<DrawerMenu data={mockMenuData} navLinks={mockNavLinks} />);

    expect(screen.getByRole('button', { name: 'Open navigation drawer' })).toBeInTheDocument();
  });

  it('renders main menu items and nav links', () => {
    render(<DrawerMenu data={mockMenuData} navLinks={mockNavLinks} />);

    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('opens submenu when clicking a menu item', () => {
    render(<DrawerMenu data={mockMenuData} navLinks={mockNavLinks} />);

    fireEvent.click(screen.getByText('Shop'));

    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Cleanser')).toBeInTheDocument();
    expect(screen.getByText('Toner')).toBeInTheDocument();
  });

  it('goes back to main menu when clicking back button', () => {
    render(<DrawerMenu data={mockMenuData} navLinks={mockNavLinks} />);

    fireEvent.click(screen.getByText('Shop'));

    fireEvent.click(screen.getByRole('button', { name: 'Back to main menu' }));

    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
