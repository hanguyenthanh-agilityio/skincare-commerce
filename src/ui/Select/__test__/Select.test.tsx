import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
} from '@/ui/Select';

function renderSelect(longList = false) {
  return render(
    <Select defaultValue="apple">
      <SelectTrigger data-testid="trigger">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectSeparator />

        {longList &&
          Array.from({ length: 30 }).map((_, i) => (
            <SelectItem key={i} value={`item-${i}`}>
              Item {i}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>,
  );
}

describe('Select component', () => {
  it('renders trigger with selected value', () => {
    renderSelect();

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Apple');
  });

  it('opens dropdown when trigger is clicked', async () => {
    renderSelect();

    fireEvent.click(screen.getByTestId('trigger'));

    const listbox = await screen.findByRole('listbox');
    expect(listbox).toBeInTheDocument();
  });

  it('renders options correctly', async () => {
    renderSelect();
    fireEvent.click(screen.getByTestId('trigger'));

    const listbox = await screen.findByRole('listbox');

    expect(within(listbox).getByText('Apple')).toBeInTheDocument();
    expect(within(listbox).getByText('Orange')).toBeInTheDocument();
  });

  it('changes value when selecting item', async () => {
    renderSelect();

    fireEvent.click(screen.getByTestId('trigger'));

    const listbox = await screen.findByRole('listbox');
    fireEvent.click(within(listbox).getByText('Orange'));

    // reopen to verify state
    fireEvent.click(screen.getByTestId('trigger'));

    expect(screen.getByTestId('trigger')).toHaveTextContent('Orange');
  });

  it('renders separator', async () => {
    renderSelect();
    fireEvent.click(screen.getByTestId('trigger'));

    const sep = document.querySelector('[data-slot="select-separator"]');
    expect(sep).toBeTruthy();
  });

  it('does not crash when list is long', async () => {
    renderSelect(true);
    fireEvent.click(screen.getByTestId('trigger'));

    const listbox = await screen.findByRole('listbox');
    const items = within(listbox).getAllByRole('option');

    expect(items.length).toBeGreaterThan(20);
  });
});
