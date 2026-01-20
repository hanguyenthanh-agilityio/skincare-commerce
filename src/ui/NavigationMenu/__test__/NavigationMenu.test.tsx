import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '..';

function renderBasicMenu(viewport = true) {
  return render(
    <NavigationMenu viewport={viewport}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/a">Item A</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>,
  );
}
describe('NavigationMenu', () => {
  it('renders root navigation menu', () => {
    renderBasicMenu();

    const root = screen.getByRole('navigation');
    expect(root).toBeInTheDocument();
    expect(root).toHaveAttribute('data-slot', 'navigation-menu');
  });

  it('renders trigger with label and chevron icon', () => {
    renderBasicMenu();

    const trigger = screen.getByText('Products');
    expect(trigger).toBeInTheDocument();

    // ChevronDownIcon renders as svg
    const icon = trigger.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('opens menu content when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderBasicMenu();

    const trigger = screen.getByText('Products');
    await user.click(trigger);

    expect(screen.getByText('Item A')).toBeInTheDocument();
  });

  it('does not render viewport when viewport=false', () => {
    renderBasicMenu(false);

    const viewport = document.querySelector('[data-slot="navigation-menu-viewport"]');
    expect(viewport).toBeNull();
  });

  it('applies custom className to trigger', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">Menu</NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText('Menu');
    expect(trigger.className).toContain('custom-trigger');
  });
});
