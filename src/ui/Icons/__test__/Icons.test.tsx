import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Icons } from '@/ui/Icons';

describe('Icons', () => {
  it('renders Arrow icon', () => {
    render(<Icons.Arrow data-testid="arrow-icon" />);

    const svg = screen.getByTestId('arrow-icon');
    expect(svg).toBeInTheDocument();
    expect(svg.tagName.toLowerCase()).toBe('svg');
  });

  it('renders DownArrow icon', () => {
    render(<Icons.DownArrow data-testid="down-arrow-icon" />);

    const svg = screen.getByTestId('down-arrow-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders Plus icon', () => {
    render(<Icons.Plus data-testid="plus-icon" />);

    const svg = screen.getByTestId('plus-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders Star icon with aria-hidden', () => {
    render(<Icons.Star data-testid="star-icon" />);

    const svg = screen.getByTestId('star-icon');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders Hamburger icon', () => {
    render(<Icons.Hamburger data-testid="hamburger-icon" />);

    const svg = screen.getByTestId('hamburger-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders Cart icon', () => {
    render(<Icons.Cart data-testid="cart-icon" />);

    const svg = screen.getByTestId('cart-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders User icon', () => {
    render(<Icons.User data-testid="user-icon" />);

    const svg = screen.getByTestId('user-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders social icons', () => {
    render(
      <>
        <Icons.Instagram data-testid="instagram-icon" />
        <Icons.Facebook data-testid="facebook-icon" />
        <Icons.Twitter data-testid="twitter-icon" />
      </>,
    );

    expect(screen.getByTestId('instagram-icon')).toBeInTheDocument();
    expect(screen.getByTestId('facebook-icon')).toBeInTheDocument();
    expect(screen.getByTestId('twitter-icon')).toBeInTheDocument();
  });

  it('renders Logo icon', () => {
    render(<Icons.Logo data-testid="logo-icon" />);

    const svg = screen.getByTestId('logo-icon');
    expect(svg).toBeInTheDocument();
  });

  it('renders utility icons (back, dot)', () => {
    render(
      <>
        <Icons.back data-testid="back-icon" />
        <Icons.dot data-testid="dot-icon" />
      </>,
    );

    expect(screen.getByTestId('back-icon')).toBeInTheDocument();
    expect(screen.getByTestId('dot-icon')).toBeInTheDocument();
  });

  it('renders product icons', () => {
    render(
      <>
        <Icons.Bottle data-testid="bottle-icon" />
        <Icons.Cream data-testid="cream-icon" />
        <Icons.Soap data-testid="soap-icon" />
      </>,
    );

    expect(screen.getByTestId('bottle-icon')).toBeInTheDocument();
    expect(screen.getByTestId('cream-icon')).toBeInTheDocument();
    expect(screen.getByTestId('soap-icon')).toBeInTheDocument();
  });

  it('forwards className to svg', () => {
    render(<Icons.Plus data-testid="plus-icon" className="text-red-500 w-6 h-6" />);

    const svg = screen.getByTestId('plus-icon');
    expect(svg).toHaveClass('text-red-500');
    expect(svg).toHaveClass('w-6');
    expect(svg).toHaveClass('h-6');
  });

  it('forwards aria-label for accessibility', () => {
    render(<Icons.Arrow data-testid="arrow-icon" aria-label="arrow" role="img" />);

    const svg = screen.getByTestId('arrow-icon');
    expect(svg).toHaveAttribute('aria-label', 'arrow');
    expect(svg).toHaveAttribute('role', 'img');
  });
});
