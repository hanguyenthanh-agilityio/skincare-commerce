import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenu,
} from '..';

function renderMenu() {
  return render(
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuCheckboxItem checked>Enable notifications</DropdownMenuCheckboxItem>
        <DropdownMenuRadioGroup value="dark">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>,
  );
}
async function openMenu() {
  const user = userEvent.setup();
  await user.click(screen.getByText('Open menu'));
  await screen.findByText('Profile'); // waits until portal is mounted
}

describe('Dropdown components', () => {
  it('renders trigger', () => {
    renderMenu();
    expect(screen.getByText('Open menu')).toBeInTheDocument();
  });

  it('menu is not rendered by default', () => {
    renderMenu();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('opens menu when trigger clicked', async () => {
    renderMenu();
    await openMenu();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders menu items', async () => {
    renderMenu();
    await openMenu();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Enable notifications')).toBeInTheDocument();
    expect(screen.getByText('Light')).toBeInTheDocument();
    expect(screen.getByText('Dark')).toBeInTheDocument();
  });

  it('checkbox item shows checked state', async () => {
    renderMenu();
    await openMenu();
    const checkbox = screen
      .getByText('Enable notifications')
      .closest('[data-slot="dropdown-menu-checkbox-item"]')!;
    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('radio item is checked correctly', async () => {
    renderMenu();
    await openMenu();
    const dark = screen.getByText('Dark').closest('[data-slot="dropdown-menu-radio-item"]')!;
    expect(dark).toHaveAttribute('data-state', 'checked');
  });

  it('opens sub menu on hover', async () => {
    renderMenu();
    await openMenu();
    const user = userEvent.setup();
    const trigger = screen.getByText('More');
    await user.hover(trigger);
    const settings = await screen.findByText('Settings');
    expect(settings).toBeInTheDocument();
  });

  it('adds correct data-slot attributes', () => {
    renderMenu();
    expect(
      screen.getByText('Open menu').closest('[data-slot="dropdown-menu-trigger"]'),
    ).toBeTruthy();
  });
});
