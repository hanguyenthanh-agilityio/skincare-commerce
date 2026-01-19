import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import SortDropdown from '..';
import type { SortContent } from '@/types';

// Mock constants
vi.mock('@/constants', () => ({
  EMPTY_LABEL: {
    en: 'All',
    vi: 'Tất cả',
  },
  SORT_VALUES: ['price_asc', 'price_desc'],
}));

// Mock utils
const updateQueryParamMock = vi.fn();

vi.mock('@/utils', () => ({
  updateQueryParam: (...args: unknown[]) => updateQueryParamMock(...args),
}));

// Mock RadioDropdown
vi.mock('@/components', () => ({
  RadioDropdown: ({
    label,
    value,
    options,
    emptyLabel,
    onChange,
  }: {
    label: string;
    value: string;
    options: Record<string, string>;
    emptyLabel?: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      <span>{label}</span>
      <span data-testid="current-value">{value}</span>
      <span data-testid="empty-label">{emptyLabel}</span>

      {options &&
        Object.entries(options).map(([key, optionLabel]) => (
          <button key={key} onClick={() => onChange(key)} data-testid={`option-${key}`}>
            {optionLabel}
          </button>
        ))}
    </div>
  ),
}));

const mockContent: SortContent = {
  label: 'Sort by',
  options: {
    price_asc: 'Price: Low to High',
    price_desc: 'Price: High to Low',
    newest: 'Newest',
    popularity: 'Popularity',
  },
};

const locale = 'en';

describe('SortDropdown', () => {
  beforeEach(() => {
    updateQueryParamMock.mockClear();
  });

  it('renders RadioDropdown with label and empty label', () => {
    render(<SortDropdown content={mockContent} locale={locale} />);

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByTestId('empty-label')).toHaveTextContent('All');
  });

  it('passes current value to RadioDropdown', () => {
    render(<SortDropdown content={mockContent} value="price_asc" locale={locale} />);

    expect(screen.getByTestId('current-value')).toHaveTextContent('price_asc');
  });

  it('calls updateQueryParam with value when selecting a different option', () => {
    render(<SortDropdown content={mockContent} value="price_asc" locale={locale} />);

    screen.getByTestId('option-price_desc').click();

    expect(updateQueryParamMock).toHaveBeenCalledOnce();
    expect(updateQueryParamMock).toHaveBeenCalledWith('sort', 'price_desc');
  });

  it('clears sort query param when selecting the same value', () => {
    render(<SortDropdown content={mockContent} value="price_asc" locale={locale} />);

    screen.getByTestId('option-price_asc').click();

    expect(updateQueryParamMock).toHaveBeenCalledOnce();
    expect(updateQueryParamMock).toHaveBeenCalledWith('sort');
  });

  it('works when value is undefined', () => {
    render(<SortDropdown content={mockContent} locale={locale} />);

    screen.getByTestId('option-price_asc').click();

    expect(updateQueryParamMock).toHaveBeenCalledWith('sort', 'price_asc');
  });
});
