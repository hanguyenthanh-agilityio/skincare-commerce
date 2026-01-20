/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import RadioDropdown from '..';

// Mock UI
vi.mock('@/ui', () => ({
  Button: ({
    children,
    ...props
  }: React.PropsWithChildren<React.ButtonHTMLAttributes<HTMLButtonElement>>) => (
    <button {...props}>{children}</button>
  ),
  Icons: {
    DownArrow: (props: React.SVGProps<SVGSVGElement>) => (
      <svg data-testid="down-arrow" {...props} />
    ),
  },
  DropdownMenu: ({
    children,
    onOpenChange,
  }: {
    children: React.ReactNode;
    onOpenChange?: (open: boolean) => void;
  }) => (
    <div data-testid="dropdown" onClick={() => onOpenChange?.(true)}>
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DropdownMenuRadioGroup: ({
    children,
    onValueChange,
  }: {
    children: React.ReactNode;
    onValueChange?: (value: string) => void;
  }) => (
    <div>
      {Array.isArray(children)
        ? children.map((child: any) =>
            child
              ? {
                  ...child,
                  props: {
                    ...child.props,
                    onClick: () => onValueChange?.(child.props.value),
                  },
                }
              : child,
          )
        : children}
    </div>
  ),

  DropdownMenuRadioItem: ({
    children,
    value,
    onClick,
  }: {
    children: React.ReactNode;
    value: string;
    onClick?: () => void;
  }) => (
    <div role="menuitemradio" data-value={value} onClick={() => onClick?.()}>
      {children}
    </div>
  ),
}));

// Mock shared components
vi.mock('@/components', () => ({
  TypographyWrapper: ({ title }: { title: string }) => <span>{title}</span>,
}));

// Mock utility
vi.mock('@/lib', () => ({
  cn: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const OPTIONS = {
  asc: 'Ascending',
  desc: 'Descending',
} as const;

type SortValue = keyof typeof OPTIONS;

describe('RadioDropdown', () => {
  it('renders label and selected value', () => {
    render(
      <RadioDropdown<SortValue>
        label="Sort"
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
      />,
    );

    // Label
    expect(screen.getByText('Sort:')).toBeInTheDocument();

    // Selected value inside button
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Ascending');
  });

  it('renders emptyLabel when no value is selected', () => {
    render(
      <RadioDropdown<SortValue>
        label="Sort"
        emptyLabel="Select"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('renders all radio options', () => {
    render(
      <RadioDropdown<SortValue>
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
      />,
    );

    const radioItems = screen.getAllByRole('menuitemradio');

    expect(radioItems).toHaveLength(2);
    expect(radioItems[0]).toHaveTextContent('Ascending');
    expect(radioItems[1]).toHaveTextContent('Descending');
  });

  it('renders down arrow icon', () => {
    render(
      <RadioDropdown<SortValue>
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
      />,
    );

    expect(screen.getByTestId('down-arrow')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <RadioDropdown<SortValue>
        label="Sort"
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
        className="custom-class"
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders empty string when no value and no emptyLabel are provided', () => {
    render(
      <RadioDropdown<SortValue> options={OPTIONS} values={['asc', 'desc']} onChange={vi.fn()} />,
    );

    const button = screen.getByRole('button');

    expect(button.textContent).toBe('');
  });

  it('rotates down arrow when dropdown is open', async () => {
    render(
      <RadioDropdown<SortValue>
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={vi.fn()}
      />,
    );

    const arrow = screen.getByTestId('down-arrow');

    // Initially not rotated
    expect(arrow).not.toHaveClass('rotate-180');

    // Click dropdown to open
    await screen.getByTestId('dropdown').click();

    expect(arrow).toHaveClass('rotate-180');
  });

  it('calls onChange when a radio option is selected', () => {
    const onChange = vi.fn();

    render(
      <RadioDropdown<SortValue>
        value="asc"
        options={OPTIONS}
        values={['asc', 'desc']}
        onChange={onChange}
      />,
    );

    const radioItems = screen.getAllByRole('menuitemradio');

    // Click "Descending"
    radioItems[1].click();

    expect(onChange).toHaveBeenCalledWith('desc');
  });
});
