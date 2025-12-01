import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import MegaMenu from '..';
import { describe, it, expect } from 'vitest';

const menuData = [
  {
    title: 'Products',
    columns: [
      { heading: 'Skincare', items: ['Cleansers', 'Toners'] },
      { heading: 'Makeup', items: ['Lipstick', 'Foundation'] },
    ],
    imageUrl: '/images/sample-product.png',
  },
];

describe('MegaMenu', () => {
  it('renders images when hovered', async () => {
    const user = userEvent.setup();
    render(<MegaMenu data={menuData} />);

    const trigger = screen.getByText('Products');
    await user.hover(trigger);

    const img = await screen.findByAltText('Product');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/sample-product.png');
  });
});
