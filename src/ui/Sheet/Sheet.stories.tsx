import type { Meta, StoryObj } from '@storybook/react-vite';

// UI
import { Button } from '@/ui';

// Components
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '.';

const meta: Meta<typeof Sheet> = {
  title: 'UI/Sheet',
  component: Sheet,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sheet>;

/* ---------------------------------- */
/* Default (Right) */
/* ---------------------------------- */
export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open Sheet</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <div className="p-4 text-sm text-muted-foreground">Sheet content goes here</div>

        <SheetFooter>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

/* ---------------------------------- */
/* Left */
/* ---------------------------------- */
export const Left: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="light">Open Left</Button>
      </SheetTrigger>

      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Left Sheet</SheetTitle>
          <SheetDescription>Appears from the left</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};

/* ---------------------------------- */
/* Bottom */
/* ---------------------------------- */
export const Bottom: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="light">Open Bottom</Button>
      </SheetTrigger>

      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Bottom Sheet</SheetTitle>
          <SheetDescription>Mobile-style sheet</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
