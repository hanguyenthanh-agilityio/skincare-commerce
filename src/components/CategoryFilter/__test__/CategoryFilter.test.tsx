import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';

import CategoryFilter from '..';

import type { CategoryContent, Locale } from '@/types';
import { updateQueryParam } from '@/utils';

vi.mock('@/utils', () => ({
  updateQueryParam: vi.fn(),
}));

vi.mock('@/components', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/components')>();

  return {
    ...actual,
    RadioDropdown: ({
      label,
      options,
      onChange,
    }: {
      label: string;
      options: Record<string, string>;
      onChange: (value: string) => void;
    }) => (
      <div>
        <span>{label}</span>

        {Object.entries(options).map(([value, label]) => (
          <button key={value} data-testid={`option-${value}`} onClick={() => onChange(value)}>
            {label}
          </button>
        ))}
      </div>
    ),
  };
});

const mockContent: CategoryContent = {
  label: 'Category',
  options: {
    cleanse: 'Cleanse',
    exfoliate: 'Exfoliate',
    suncare: 'Suncare',
    toner: 'Toner',
    shave: 'Shave',
    hydrate: 'Hydrate',
    'eyes-lips': 'Eyes & Lips',
    'treat-masque': 'Treat & Masque',
  },
};

const locale: Locale = 'en';

describe('CategoryFilter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls updateQueryParam with value when selecting a new category', () => {
    render(<CategoryFilter content={mockContent} value="cleanse" locale={locale} />);

    fireEvent.click(screen.getByTestId('option-suncare'));

    expect(updateQueryParam).toHaveBeenCalledWith('category', 'suncare');
  });

  it('clears category when selecting the same value again', () => {
    render(<CategoryFilter content={mockContent} value="cleanse" locale={locale} />);

    fireEvent.click(screen.getByTestId('option-cleanse'));

    expect(updateQueryParam).toHaveBeenCalledWith('category');
  });
});
