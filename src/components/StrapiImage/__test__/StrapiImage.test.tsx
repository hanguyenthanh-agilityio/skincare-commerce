import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StrapiImage from '..';

describe('StrapiImage', () => {
  it('renders image from URL string', () => {
    render(
      <StrapiImage
        image={{
          url: 'https://imageskincare.com/cdn/shop/products/VITAL_C_hydrating_facial_cleanser_PDP_R01a.jpg?v=1762197992&width=600',
          alternativeText: 'Hydrating Facial Cleanser',
        }}
      />,
    );

    const img = screen.getByRole('img', { name: /hydrating facial cleanser/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      'https://imageskincare.com/cdn/shop/products/VITAL_C_hydrating_facial_cleanser_PDP_R01a.jpg?v=1762197992&width=600',
    );
  });

  it('renders fallback div when image is null', () => {
    render(<StrapiImage image={null} />);
    const fallback = screen.getByTestId('strapi-image-fallback');
    expect(fallback).toBeInTheDocument();
  });

  it('applies className correctly', () => {
    render(<StrapiImage image="https://placeholder.co/400x300" className="rounded-xl" />);

    const img = screen.getByAltText('');
    expect(img).toHaveClass('rounded-xl');
  });
});
