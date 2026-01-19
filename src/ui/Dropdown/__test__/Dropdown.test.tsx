import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuLabel,
} from '..';

function renderMenu() {
  return render(
    <DropdownMenu>
      <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>

      <DropdownMenuPortal>
        <DropdownMenuContent>
          <DropdownMenuLabel>Account</DropdownMenuLabel>

          <DropdownMenuGroup>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

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
      </DropdownMenuPortal>
    </DropdownMenu>,
  );
}

async function openMenu() {
  const user = userEvent.setup();
  await user.click(screen.getByText('Open menu'));
  await screen.findByText('Profile');
}

describe('DropdownMenu components', () => {
  it('renders trigger', () => {
    renderMenu();
    expect(screen.getByText('Open menu')).toBeInTheDocument();
  });

  it('menu is not visible by default', () => {
    renderMenu();
    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
  });

  it('opens menu when trigger is clicked', async () => {
    renderMenu();
    await openMenu();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('renders DropdownMenuGroup', async () => {
    renderMenu();
    await openMenu();

    const group = screen.getByText('Profile').closest('[data-slot="dropdown-menu-group"]');

    expect(group).toBeTruthy();
  });

  it('renders DropdownMenuLabel', async () => {
    renderMenu();
    await openMenu();

    const label = screen.getByText('Account').closest('[data-slot="dropdown-menu-label"]');

    expect(label).toBeTruthy();
  });

  it('renders DropdownMenuSeparator', async () => {
    renderMenu();
    await openMenu();

    const separator = document.querySelector('[data-slot="dropdown-menu-separator"]');

    expect(separator).toBeTruthy();
  });

  it('renders DropdownMenuShortcut', async () => {
    renderMenu();
    await openMenu();

    const shortcut = screen.getByText('⌘B').closest('[data-slot="dropdown-menu-shortcut"]');

    expect(shortcut).toBeTruthy();
  });

  it('checkbox item has checked state', async () => {
    renderMenu();
    await openMenu();

    const checkbox = screen
      .getByText('Enable notifications')
      .closest('[data-slot="dropdown-menu-checkbox-item"]');

    expect(checkbox).toHaveAttribute('data-state', 'checked');
  });

  it('radio item is checked correctly', async () => {
    renderMenu();
    await openMenu();

    const checkedRadio = screen.getByText('Dark').closest('[data-slot="dropdown-menu-radio-item"]');

    expect(checkedRadio).toHaveAttribute('data-state', 'checked');
  });

  it('opens sub menu on hover', async () => {
    renderMenu();
    await openMenu();

    const user = userEvent.setup();
    await user.hover(screen.getByText('More'));

    expect(await screen.findByText('Settings')).toBeInTheDocument();
  });

  it('adds correct data-slot to trigger', () => {
    renderMenu();

    const trigger = screen.getByText('Open menu').closest('[data-slot="dropdown-menu-trigger"]');

    expect(trigger).toBeTruthy();
  });
});
