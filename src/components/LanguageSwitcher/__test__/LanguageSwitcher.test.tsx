import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

import type { Locale } from '@/types';
import LanguageSwitcher from '..';

vi.mock('@/components', () => ({
  RadioDropdown: ({
    value,
    options,
    values,
    onChange,
  }: {
    value: Locale;
    options: Record<Locale, string>;
    values: Locale[];
    onChange: (val: Locale) => void;
  }) => (
    <div>
      {values.map((val: Locale) => (
        <button
          key={val}
          data-testid={`lang-${val}`}
          aria-pressed={value === val}
          onClick={() => onChange(val)}
        >
          {options[val]}
        </button>
      ))}
    </div>
  ),
}));

const mockAssign = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();

  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: '',
      search: '',
      hash: '',
      assign: mockAssign,
    },
  });
});

describe('LanguageSwitcher', () => {
  it('renders language options', () => {
    render(<LanguageSwitcher pathname="/en/" locale="en" />);

    expect(screen.getByText('EN')).toBeInTheDocument();
    expect(screen.getByText('VI')).toBeInTheDocument();
  });

  it('marks current locale as active', () => {
    render(<LanguageSwitcher pathname="/en/" locale="en" />);

    const enBtn = screen.getByTestId('lang-en');
    const viBtn = screen.getByTestId('lang-vi');

    expect(enBtn).toHaveAttribute('aria-pressed', 'true');
    expect(viBtn).toHaveAttribute('aria-pressed', 'false');
  });

  it('redirects to new locale path when language changes', () => {
    window.location.search = '?q=test';
    window.location.hash = '#section';

    render(<LanguageSwitcher pathname="/en/products" locale="en" />);

    fireEvent.click(screen.getByTestId('lang-vi'));

    expect(window.location.href).toBe('/vi/products?q=test#section');
  });

  it('adds trailing slash when switching from root locale path', () => {
    render(<LanguageSwitcher pathname="/en" locale="en" />);

    fireEvent.click(screen.getByTestId('lang-vi'));

    expect(window.location.href).toBe('/vi/');
  });

  it('does not redirect when selecting the same locale', () => {
    render(<LanguageSwitcher pathname="/en/about" locale="en" />);

    fireEvent.click(screen.getByTestId('lang-en'));

    expect(window.location.href).toBe('');
  });

  it('switches from vi to en correctly', () => {
    render(<LanguageSwitcher pathname="/vi/about" locale="vi" />);

    fireEvent.click(screen.getByTestId('lang-en'));

    expect(window.location.href).toBe('/en/about');
  });
});
