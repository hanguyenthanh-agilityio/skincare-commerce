import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import DropdownMenu from '..';

// Mock UI components
vi.mock('@/ui', () => ({
  HoverCard: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  HoverCardTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  HoverCardContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Button: ({
    children,
    ...props
  }: { children: React.ReactNode } & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock shared components
vi.mock('@/components', () => ({
  LinkWrapper: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
  StrapiImage: ({ image }: { image: { url?: string } | undefined }) => (
    <img alt="menu-image" src={image?.url || ''} />
  ),
}));

// Mock utility
vi.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const mockData = [
  {
    title: 'Shop',
    imageUrl: {
      url: '/image.jpg',
    },
    columns: [
      {
        heading: 'Category',
        items: [
          {
            label: 'Skincare',
            href: '/skincare',
          },
          {
            label: 'Makeup',
            href: '/makeup',
          },
        ],
      },
    ],
  },
];

describe('DropdownMenu', () => {
  it('renders navigation container', () => {
    render(
      <DropdownMenu
        data={mockData.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.url,
        }))}
      />,
    );

    expect(
      screen.getByRole('navigation', {
        name: /primary mega navigation/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders menu title button', () => {
    render(
      <DropdownMenu
        data={mockData.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.url,
        }))}
      />,
    );

    expect(screen.getByRole('button', { name: 'Shop' })).toBeInTheDocument();
  });

  it('renders submenu column heading', () => {
    render(
      <DropdownMenu
        data={mockData.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.url,
        }))}
      />,
    );

    expect(screen.getByText('Category')).toBeInTheDocument();
  });

  it('renders submenu links with correct href', () => {
    render(
      <DropdownMenu
        data={mockData.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.url,
        }))}
      />,
    );

    const skincareLink = screen.getByText('Skincare');
    expect(skincareLink).toBeInTheDocument();
    expect(skincareLink.closest('a')).toHaveAttribute('href', '/skincare');

    const makeupLink = screen.getByText('Makeup');
    expect(makeupLink).toBeInTheDocument();
    expect(makeupLink.closest('a')).toHaveAttribute('href', '/makeup');
  });

  it('applies custom className when provided', () => {
    render(
      <DropdownMenu
        data={mockData.map((item) => ({
          ...item,
          imageUrl: item.imageUrl.url,
        }))}
        className="custom-class"
      />,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });
});
