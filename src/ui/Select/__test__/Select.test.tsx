import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectGroup,
  SelectLabel,
} from '@/ui/Select';

function renderSelect(longList = false) {
  return render(
    <Select defaultValue="apple">
      <SelectTrigger data-testid="trigger">
        <SelectValue placeholder="Pick a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="orange">Orange</SelectItem>
        </SelectGroup>

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

    // reopen to verify updated state
    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByTestId('trigger')).toHaveTextContent('Orange');
  });

  it('renders select label', async () => {
    renderSelect();

    fireEvent.click(screen.getByTestId('trigger'));
    expect(await screen.findByText('Fruits')).toBeInTheDocument();
  });

  it('renders separator', async () => {
    renderSelect();

    fireEvent.click(screen.getByTestId('trigger'));

    const separator = document.querySelector('[data-slot="select-separator"]');
    expect(separator).toBeTruthy();
  });

  it('renders grouped items correctly (SelectGroup)', async () => {
    renderSelect();

    fireEvent.click(screen.getByTestId('trigger'));
    const listbox = await screen.findByRole('listbox');

    const options = within(listbox).getAllByRole('option');
    expect(options.length).toBeGreaterThanOrEqual(2);
  });

  it('does not crash when list is long', async () => {
    renderSelect(true);

    fireEvent.click(screen.getByTestId('trigger'));
    const listbox = await screen.findByRole('listbox');

    const items = within(listbox).getAllByRole('option');
    expect(items.length).toBeGreaterThan(20);
  });
});
