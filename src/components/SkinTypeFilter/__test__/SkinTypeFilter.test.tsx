import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import SkinTypeFilter from '..';
import type { SkinTypeContent } from '@/types';
import { updateQueryParam } from '@/utils';

// Mock constants
vi.mock('@/constants', () => ({
  SKIN_TYPE_VALUES: ['dry', 'oily', 'normal', 'combination', 'sensitive', 'mature'],
  EMPTY_LABEL: {
    en: 'All skin types',
    vi: 'Tất cả loại da',
  },
}));

vi.mock('@/utils', () => ({
  updateQueryParam: vi.fn(),
}));

// Mock RadioDropdown
vi.mock('@/components', () => ({
  RadioDropdown: ({
    label,
    emptyLabel,
    className,
    onChange,
  }: {
    label: string;
    emptyLabel: string;
    className?: string;
    onChange: (value: string) => void;
  }) => (
    <div data-testid="radio-dropdown" className={className}>
      <span>{label}</span>
      <span>{emptyLabel}</span>

      <button onClick={() => onChange('oily')}>select-oily</button>
      <button onClick={() => onChange('dry')}>select-dry</button>
    </div>
  ),
}));

const mockContent: SkinTypeContent = {
  label: 'Skin Type',
  options: {
    dry: 'Dry',
    oily: 'Oily',
    normal: 'Normal',
    combination: 'Combination',
    sensitive: 'Sensitive',
    mature: 'Mature',
  },
};

describe('SkinTypeFilter', () => {
  const updateQueryParamMock = vi.mocked(updateQueryParam);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders label correctly', () => {
    render(<SkinTypeFilter content={mockContent} value="dry" locale="en" />);

    expect(screen.getByText('Skin Type')).toBeInTheDocument();
  });

  it('renders empty label based on locale', () => {
    render(<SkinTypeFilter content={mockContent} locale="vi" />);

    expect(screen.getByText('Tất cả loại da')).toBeInTheDocument();
  });

  it('passes className to RadioDropdown', () => {
    render(<SkinTypeFilter content={mockContent} locale="en" className="custom-class" />);

    expect(screen.getByTestId('radio-dropdown')).toHaveClass('custom-class');
  });

  it('sets query param when next value differs from current', () => {
    render(<SkinTypeFilter content={mockContent} value="dry" locale="en" />);

    fireEvent.click(screen.getByText('select-oily'));

    expect(updateQueryParamMock).toHaveBeenCalledWith('skinType', 'oily');
  });

  it('clears query param when selecting same value', () => {
    render(<SkinTypeFilter content={mockContent} value="dry" locale="en" />);

    fireEvent.click(screen.getByText('select-dry'));

    expect(updateQueryParamMock).toHaveBeenCalledWith('skinType');
  });
});
