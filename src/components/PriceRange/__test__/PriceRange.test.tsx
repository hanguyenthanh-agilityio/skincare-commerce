import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PriceRange from '..';

vi.mock('@/ui', async () => {
  const actual = await vi.importActual<typeof import('@/ui')>('@/ui');

  return {
    ...actual,
    Slider: ({
      value,
      onValueChange,
    }: {
      value: [number, number];
      onValueChange: (value: [number, number]) => void;
    }) => (
      <div>
        <button
          data-testid="slider-change"
          onClick={() => onValueChange([value[0] + 100, value[1] - 100])}
        >
          Change slider
        </button>
      </div>
    ),
  };
});

// Mock window.location
const originalLocation = window.location;

beforeEach(() => {
  vi.useFakeTimers();

  Object.defineProperty(window, 'location', {
    configurable: true,
    value: {
      href: 'http://localhost/?minPrice=200&maxPrice=800&page=2',
    },
  });
});

afterEach(() => {
  vi.useRealTimers();
  Object.defineProperty(window, 'location', {
    configurable: true,
    value: originalLocation,
  });
});

describe('PriceRange', () => {
  it('renders title and labels', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('From')).toBeInTheDocument();
    expect(screen.getByText('To')).toBeInTheDocument();
  });

  it('initializes range from URL params', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} min={0} max={2000} />);

    const minInput = screen.getByLabelText('From') as HTMLInputElement;
    const maxInput = screen.getByLabelText('To') as HTMLInputElement;

    expect(minInput.value).toBe('200');
    expect(maxInput.value).toBe('800');
  });

  it('updates range when min input changes', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    const minInput = screen.getByLabelText('From') as HTMLInputElement;

    fireEvent.change(minInput, { target: { value: '300' } });

    expect(minInput.value).toBe('300');
  });

  it('updates range when max input changes', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    const maxInput = screen.getByLabelText('To') as HTMLInputElement;

    fireEvent.change(maxInput, { target: { value: '1500' } });

    expect(maxInput.value).toBe('1500');
  });

  it('updates URL after debounce when input changes', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    const minInput = screen.getByLabelText('From');

    fireEvent.change(minInput, { target: { value: '400' } });

    expect(window.location.href).toContain('minPrice=200');

    vi.advanceTimersByTime(400);

    expect(window.location.href).toContain('minPrice=400');
    expect(window.location.href).toContain('maxPrice=800');
    expect(window.location.href).not.toContain('page=');
  });

  it('updates range when slider changes', () => {
    render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    fireEvent.click(screen.getByTestId('slider-change'));

    const minInput = screen.getByLabelText('From') as HTMLInputElement;
    const maxInput = screen.getByLabelText('To') as HTMLInputElement;

    expect(minInput.value).toBe('300');
    expect(maxInput.value).toBe('700');
  });

  it('clears debounce timer on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = render(<PriceRange title="Price" labels={{ from: 'From', to: 'To' }} />);

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
