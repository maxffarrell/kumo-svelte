import { cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/svelte';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Autocomplete } from '$lib/components/autocomplete';
import AutocompleteFixture from './AutocompleteFixture.svelte';

const fruits = ['Apple', 'Apricot', 'Banana', 'Blueberry'];

afterEach(() => cleanup());

async function typeQuery(query: string) {
  const input = screen.getByTestId('autocomplete-input');
  const data = query.at(-1) ?? query;

  await fireEvent.focus(input);
  await fireEvent(
    input,
    new InputEvent('beforeinput', {
      bubbles: true,
      cancelable: true,
      inputType: 'insertText',
      data
    })
  );
  await fireEvent.input(input, {
    target: { value: query },
    inputType: 'insertText',
    data
  });

  return input;
}

describe('Autocomplete exports', () => {
  it('exports the consolidated compound API surface', () => {
    expect(Autocomplete.InputGroup).toBeDefined();
    expect(Autocomplete.Content).toBeDefined();
    expect(Autocomplete.List).toBeDefined();
    expect(Autocomplete.Item).toBeDefined();
    expect(Autocomplete.Group).toBeDefined();
    expect(Autocomplete.GroupLabel).toBeDefined();
    expect(Autocomplete.Collection).toBeDefined();
    expect(Autocomplete.Separator).toBeDefined();
    expect(Autocomplete.useFilter).toBeDefined();
  });
});

describe('Autocomplete filtering and open behavior', () => {
  it('keeps content closed until the current focus session receives text input', async () => {
    render(AutocompleteFixture, { items: fruits, open: true });

    await fireEvent.focus(screen.getByTestId('autocomplete-input'));

    expect(screen.queryByTestId('autocomplete-content')).not.toBeInTheDocument();

    await typeQuery('ap');

    expect(screen.getByTestId('autocomplete-content')).toBeInTheDocument();
  });

  it('filters items by label and value', async () => {
    render(AutocompleteFixture, {
      items: [
        { label: 'San Jose', value: 'sjc' },
        { label: 'Portland', value: 'pdx' },
        { label: 'Ashburn', value: 'iad' }
      ]
    });

    await typeQuery('pd');

    expect(screen.getByRole('button', { name: 'Portland' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'San Jose' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Ashburn' })).not.toBeInTheDocument();
  });

  it('supports custom filters and filter=null passthrough', async () => {
    const startsWith = vi.fn((item: unknown, query: string) => {
      const label = typeof item === 'object' && item && 'label' in item ? String(item.label) : String(item);
      return label.toLowerCase().startsWith(query.toLowerCase());
    });

    render(AutocompleteFixture, { items: fruits, filter: startsWith });
    await typeQuery('ap');

    expect(startsWith).toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Apricot' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Banana' })).not.toBeInTheDocument();

    cleanup();
    render(AutocompleteFixture, { items: fruits, filter: null });
    await typeQuery('zz');

    expect(screen.getByRole('button', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Blueberry' })).toBeInTheDocument();
  });
});

describe('Autocomplete selection', () => {
  it('calls onValueChange and closes content on selection', async () => {
    const onValueChange = vi.fn();
    const onOpenChange = vi.fn();
    render(AutocompleteFixture, {
      items: [
        { label: 'San Jose', value: 'sjc' },
        { label: 'Ashburn', value: 'iad' }
      ],
      onValueChange,
      onOpenChange
    });

    await typeQuery('san');
    await fireEvent.click(screen.getByRole('button', { name: 'San Jose' }));

    expect(onValueChange).toHaveBeenLastCalledWith('sjc');
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
    expect(screen.queryByTestId('autocomplete-content')).not.toBeInTheDocument();
  });

  it('does not select disabled items', async () => {
    const onValueChange = vi.fn();
    render(AutocompleteFixture, {
      items: [
        { label: 'Active', value: 'active' },
        { label: 'Disabled', value: 'disabled', disabled: true }
      ],
      onValueChange
    });

    await typeQuery('dis');

    const disabledItem = screen.getByRole('button', { name: 'Disabled' });
    expect(disabledItem).toBeDisabled();

    await fireEvent.click(disabledItem);

    expect(onValueChange).toHaveBeenCalledWith('dis');
    expect(onValueChange).not.toHaveBeenCalledWith('disabled');
    expect(screen.getByTestId('autocomplete-content')).toBeInTheDocument();
  });
});

describe('Autocomplete groups and data hooks', () => {
  it('renders grouped collections from group-local item arrays', async () => {
    render(AutocompleteFixture, {
      groups: [
        {
          label: 'US',
          items: [
            { label: 'San Jose', value: 'sjc' },
            { label: 'Ashburn', value: 'iad' }
          ]
        },
        {
          label: 'EU',
          items: [{ label: 'London', value: 'lhr' }]
        }
      ]
    });

    await typeQuery('a');

    expect(screen.getByText('US')).toBeInTheDocument();
    expect(screen.getByText('EU')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'San Jose' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'London' })).toBeInTheDocument();
  });

  it('exposes styling classes, invalid state, and stable data attributes', async () => {
    render(AutocompleteFixture, {
      items: fruits,
      error: 'Pick a fruit',
      inputClass: 'custom-input',
      contentClass: 'custom-content',
      itemClass: 'custom-item',
      rootClass: 'custom-root'
    });

    await typeQuery('ap');

    const root = screen.getByTestId('autocomplete-root');
    const input = screen.getByTestId('autocomplete-input');
    const content = screen.getByTestId('autocomplete-content');
    const item = within(content).getByRole('button', { name: 'Apple' });

    expect(root).toHaveClass('custom-root');
    expect(input).toHaveClass('custom-input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(content).toHaveClass('custom-content');
    expect(item).toHaveClass('custom-item');
    expect(item).toHaveAttribute('data-kumo-component', 'Autocomplete');
    expect(item).toHaveAttribute('data-kumo-part', 'item');
  });
});

describe('Autocomplete outside interaction', () => {
  it('closes open content when pointerdown happens outside the root', async () => {
    const onOpenChange = vi.fn();
    render(AutocompleteFixture, { items: fruits, onOpenChange });

    await typeQuery('ap');
    expect(screen.getByTestId('autocomplete-content')).toBeInTheDocument();

    await fireEvent.pointerDown(document.body);

    await waitFor(() => {
      expect(screen.queryByTestId('autocomplete-content')).not.toBeInTheDocument();
    });
    expect(onOpenChange).toHaveBeenLastCalledWith(false);
  });
});
