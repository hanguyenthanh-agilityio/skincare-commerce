import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Slider } from '@/ui';

describe('Slider', () => {
  it('renders slider root', () => {
    const { container } = render(<Slider />);

    const root = container.querySelector('[data-slot="slider"]');
    expect(root).toBeInTheDocument();
  });

  it('renders track and range', () => {
    const { container } = render(<Slider />);

    const track = container.querySelector('[data-slot="slider-track"]');
    const range = container.querySelector('[data-slot="slider-range"]');

    expect(track).toBeInTheDocument();
    expect(range).toBeInTheDocument();
  });

  it('renders thumbs based on defaultValue', () => {
    const { container } = render(<Slider defaultValue={[20]} />);

    const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(1);
  });

  it('renders multiple thumbs when value has multiple entries', () => {
    const { container } = render(<Slider value={[20, 80]} />);

    const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2);
  });

  it('falls back to min/max when no value or defaultValue is provided', () => {
    const { container } = render(<Slider min={10} max={90} />);

    const thumbs = container.querySelectorAll('[data-slot="slider-thumb"]');
    expect(thumbs).toHaveLength(2);
  });

  it('merges custom className into slider root', () => {
    const { container } = render(<Slider className="bg-red-500" />);

    const root = container.querySelector('[data-slot="slider"]');
    expect(root).toHaveClass('bg-red-500');
  });

  it('respects min and max attributes on thumb', () => {
    const { container } = render(<Slider min={5} max={50} />);

    const thumb = container.querySelector('[data-slot="slider-thumb"]');
    expect(thumb).toHaveAttribute('aria-valuemin', '5');
    expect(thumb).toHaveAttribute('aria-valuemax', '50');
  });
});
