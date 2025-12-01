import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import MenuItem from '..';

describe('MenuItem', () => {
  it('renders a link when href is provided', () => {
    render(<MenuItem label="Home" href="/home" />);

    const link = screen.getByRole('link', { name: /home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
  });

  it('renders a button when href is not provided', () => {
    render(<MenuItem label="Click me" />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('calls onClick handler when button is clicked', () => {
    const handleClick = vi.fn();
    render(<MenuItem label="Click me" onClick={handleClick} />);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders ChevronRight icon when hasArrow is true', () => {
    render(<MenuItem label="Next" href="/next" hasArrow />);

    const icon = screen.getByTestId('chevron-icon');
    expect(icon).toBeInTheDocument();
  });
});
