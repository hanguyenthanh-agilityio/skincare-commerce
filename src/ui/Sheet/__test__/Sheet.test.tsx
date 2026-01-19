import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from '@/ui';

describe('Sheet', () => {
  it('does not render content by default', () => {
    render(
      <Sheet>
        <SheetContent>
          <p>Sheet Content</p>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.queryByText('Sheet Content')).not.toBeInTheDocument();
  });

  it('opens sheet when trigger is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger>Open Sheet</SheetTrigger>
        <SheetContent>
          <p>Sheet Content</p>
        </SheetContent>
      </Sheet>,
    );

    fireEvent.click(screen.getByText('Open Sheet'));

    expect(screen.getByText('Sheet Content')).toBeInTheDocument();
  });

  it('renders header, title and description correctly', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>My Title</SheetTitle>
            <SheetDescription>My Description</SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getByText('My Description')).toBeInTheDocument();
  });

  it('renders footer correctly', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <SheetFooter>
            <button>Save</button>
          </SheetFooter>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('closes sheet when close button is clicked', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent>
          <p>Closable Content</p>
        </SheetContent>
      </Sheet>,
    );

    expect(screen.getByText('Closable Content')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close/i }));

    expect(screen.queryByText('Closable Content')).not.toBeInTheDocument();
  });

  it('applies correct side classes when side="left"', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="left" data-testid="sheet-content">
          Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId('sheet-content');
    expect(content.className).toContain('slide-in-from-left');
  });

  it('applies correct layout classes when side="top"', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="top" data-testid="sheet-content">
          Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId('sheet-content');

    expect(content.className).toContain('inset-x-0');
    expect(content.className).toContain('top-0');
    expect(content.className).toContain('border-b');
  });

  it('applies correct layout classes when side="bottom"', () => {
    render(
      <Sheet defaultOpen>
        <SheetContent side="bottom" data-testid="sheet-content">
          Content
        </SheetContent>
      </Sheet>,
    );

    const content = screen.getByTestId('sheet-content');

    expect(content.className).toContain('inset-x-0');
    expect(content.className).toContain('bottom-0');
    expect(content.className).toContain('border-t');
  });
});
