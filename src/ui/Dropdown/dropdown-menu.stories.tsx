import type { Meta, StoryObj } from '@storybook/react-vite';

// Components
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from '.';

import { Button } from '@/ui';

const meta: Meta = {
  title: 'UI/DropdownMenu',
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj;

/* ---------------------------------------------
 * Basic Dropdown
 * -------------------------------------------- */
export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Open menu</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/* ---------------------------------------------
 * With Group + Separator
 * -------------------------------------------- */
export const Grouped: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">Grouped menu</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/* ---------------------------------------------
 * Checkbox Items
 * -------------------------------------------- */
export const CheckboxItems: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>View options</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuCheckboxItem checked>Show status bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show activity bar</DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem>Show panel</DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/* ---------------------------------------------
 * Radio Group
 * -------------------------------------------- */
export const RadioGroup: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Theme</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value="system">
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

/* ---------------------------------------------
 * Sub Menu
 * -------------------------------------------- */
export const SubMenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>More actions</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem>
          New Tab
          <DropdownMenuShortcut>⌘T</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>

          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Message</DropdownMenuItem>
            <DropdownMenuItem>Copy link</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Delete project</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
