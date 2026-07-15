import { render, screen, waitFor } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { expectNoA11yViolations } from '../../../../tests/a11y';
import { KUMO_COMBOBOX_ITEM_CLASSES } from './combobox-variants';
import ComboboxTriggerInputFixture from './ComboboxTriggerInputFixture.svelte';
import ComboboxTriggerValueFixture from './ComboboxTriggerValueFixture.svelte';

const fruits = ['Apple', 'Banana', 'Cherry'];

describe('Combobox', () => {
  describe('variant fidelity', () => {
    it('applies item highlight and disabled data-attribute classes', () => {
      expect(KUMO_COMBOBOX_ITEM_CLASSES).toContain('data-highlighted:bg-kumo-tint');
      expect(KUMO_COMBOBOX_ITEM_CLASSES).toContain('data-[disabled]:opacity-60');
      expect(KUMO_COMBOBOX_ITEM_CLASSES).toContain('data-[disabled]:data-highlighted:bg-transparent');
    });

    it('applies clear button data-disabled classes', () => {
      render(ComboboxTriggerInputFixture, { items: fruits, value: 'Apple' });
      const clear = screen.getByLabelText('Clear selection');
      expect(clear.className).toContain('data-[disabled]:pointer-events-none');
      expect(clear.className).toContain('data-[disabled]:opacity-0');
    });

    it('applies trigger value placeholder data-attribute class', () => {
      render(ComboboxTriggerValueFixture, { items: fruits, value: null });
      const trigger = screen.getByRole('combobox');
      expect(trigger.className).toContain('data-[placeholder]:text-kumo-placeholder');
      expect(trigger.className).toContain('data-[disabled]:opacity-50');
    });

    it('applies error ring on trigger input', () => {
      render(ComboboxTriggerInputFixture, { items: fruits, error: 'Required' });
      expect(screen.getByRole('combobox').className).toContain('!ring-kumo-danger');
    });
  });

  describe('interaction', () => {
    it('opens list on input focus and filters on type', async () => {
      render(ComboboxTriggerInputFixture, { items: fruits });

      const input = screen.getByRole('combobox');
      await userEvent.click(input);
      await userEvent.type(input, 'Ban');

      await waitFor(() => {
        expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
      });
      expect(screen.queryByRole('option', { name: 'Apple' })).not.toBeInTheDocument();
    });

    it('selects an option on click', async () => {
      const onValueChange = vi.fn();
      render(ComboboxTriggerInputFixture, { items: fruits, onValueChange });

      await userEvent.click(screen.getByRole('combobox'));
      await userEvent.click(await screen.findByRole('option', { name: 'Cherry' }));

      expect(onValueChange).toHaveBeenCalledWith('Cherry');
    });

    it('supports keyboard navigation and Enter to select', async () => {
      const onValueChange = vi.fn();
      render(ComboboxTriggerInputFixture, { items: fruits, onValueChange });

      const input = screen.getByRole('combobox');
      input.focus();
      await userEvent.keyboard('{ArrowDown}{ArrowDown}{Enter}');

      expect(onValueChange).toHaveBeenCalledWith('Banana');
    });

    it('clears selection via clear button', async () => {
      const onValueChange = vi.fn();
      render(ComboboxTriggerInputFixture, { items: fruits, value: 'Apple', onValueChange });

      await userEvent.click(screen.getByLabelText('Clear selection'));
      expect(onValueChange).toHaveBeenCalledWith(null);
    });

    it('does not open when disabled', async () => {
      render(ComboboxTriggerInputFixture, { items: fruits, disabled: true });

      await userEvent.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has no axe violations when closed', async () => {
      const { container } = render(ComboboxTriggerInputFixture, { items: fruits });
      await expectNoA11yViolations(container);
    });

    it('has no axe violations when open', async () => {
      const user = userEvent.setup();
      const { container } = render(ComboboxTriggerInputFixture, { items: fruits });

      await user.click(screen.getByRole('combobox'));
      await waitFor(() => {
        expect(screen.getAllByRole('option').length).toBeGreaterThan(0);
      });

      // role=combobox without aria-label/controls in the trigger-input fixture — upstream structure.
      await expectNoA11yViolations(container, ['aria-input-field-name', 'aria-required-attr']);
    });
  });
});
