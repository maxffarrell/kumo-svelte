import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import {
  KUMO_AUTOCOMPLETE_ITEM_CLASSES,
  KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES
} from './autocomplete-variants';
import AutocompleteFixture from './AutocompleteFixture.svelte';

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'gb' },
  { label: 'Germany', value: 'de' }
];

const placeholder = 'Search countries…';

function getInput() {
  return screen.getByPlaceholderText(placeholder);
}

describe('Autocomplete', () => {
  it('renders input with placeholder', () => {
    render(AutocompleteFixture, { items: countries });
    expect(getInput()).toBeInTheDocument();
  });

  describe('variant fidelity', () => {
    it('applies item highlight and selected data-attribute classes', () => {
      expect(KUMO_AUTOCOMPLETE_ITEM_CLASSES).toContain('data-highlighted:bg-kumo-overlay');
      expect(KUMO_AUTOCOMPLETE_ITEM_CLASSES).toContain('data-selected:font-medium');
      expect(KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES).toContain('hidden');
      expect(KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES).toContain('group-data-selected:flex');
      expect(KUMO_AUTOCOMPLETE_ITEM_INDICATOR_CLASSES).toContain('items-center');
    });

    it('applies error ring on input', () => {
      render(AutocompleteFixture, { items: countries, error: 'Required' });
      expect(getInput().className).toContain('!ring-kumo-danger');
    });
  });

  describe('interaction', () => {
    it('opens suggestions after typing and filters options', async () => {
      const user = userEvent.setup();
      render(AutocompleteFixture, { items: countries });

      const input = getInput();
      await user.click(input);
      await user.type(input, 'Ger');

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Germany' })).toBeInTheDocument();
      });
      expect(screen.queryByRole('option', { name: 'United States' })).not.toBeInTheDocument();
    });

    it('selects an option on click', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(AutocompleteFixture, { items: countries, onValueChange });

      const input = getInput();
      await user.click(input);
      await user.type(input, 'Uni');
      await user.click(await screen.findByRole('option', { name: 'United Kingdom' }));

      expect(onValueChange).toHaveBeenCalledWith('gb');
    });

    it('supports keyboard navigation and Enter to select', async () => {
      const user = userEvent.setup();
      const onValueChange = vi.fn();
      render(AutocompleteFixture, { items: countries, onValueChange });

      const input = getInput();
      await user.click(input);
      await user.type(input, 'g');
      await user.keyboard('{ArrowDown}{Enter}');

      expect(onValueChange).toHaveBeenCalled();
    });

    it('does not show options before typing', async () => {
      const user = userEvent.setup();
      render(AutocompleteFixture, { items: countries });

      await user.click(getInput());
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });

    it('focuses input via keyboard', async () => {
      render(AutocompleteFixture, { items: countries });

      const input = getInput();
      input.focus();
      expect(document.activeElement).toBe(input);
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(AutocompleteFixture, { items: countries });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations when open with suggestions', async () => {
      const user = userEvent.setup();
      const { container } = render(AutocompleteFixture, { items: countries });

      const input = getInput();
      await user.click(input);
      await user.type(input, 'Ger');

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Germany' })).toBeInTheDocument();
      });

      // Plain input without aria-label in fixture — upstream structure.
      await expectNoA11yViolations(container, ['aria-input-field-name']);
    });
  });
});
