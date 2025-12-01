import { render, screen, fireEvent } from '@testing-library/react';
import MobileMenu from '..';
import { megaMenuData } from '@/data/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
];

describe('MobileMenu', () => {
  beforeEach(() => {
    render(<MobileMenu data={megaMenuData} navLinks={navLinks} />);
  });

  it('renders hamburger button', () => {
    const btn = screen.getByLabelText('Open Menu');
    expect(btn).toBeInTheDocument();
  });

  it('opens drawer when hamburger button is clicked', () => {
    const btn = screen.getByLabelText('Open Menu');
    fireEvent.click(btn);

    const drawer = screen.getByTestId('drawer');
    expect(drawer).toBeVisible();

    const overlay = screen.getByTestId('overlay');
    expect(overlay).toBeVisible();
  });

  it('closes drawer when close button is clicked', () => {
    const btn = screen.getByLabelText('Open Menu');
    fireEvent.click(btn);

    const closeBtn = screen.getByLabelText('Close Menu');
    fireEvent.click(closeBtn);

    const drawer = screen.getByTestId('drawer');
    expect(drawer).toHaveClass('-translate-x-full');
  });
});
