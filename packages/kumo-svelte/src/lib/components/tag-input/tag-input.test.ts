// @vitest-environment happy-dom
import { fireEvent, render, screen } from "@testing-library/svelte";
import { describe, expect, it, vi } from "vitest";
import { TagInput } from "./index";

describe("TagInput", () => {
  it("creates comma-separated tags", async () => {
    const onValueChange = vi.fn();
    render(TagInput, { props: { "aria-label": "Tags", onValueChange } });
    const input = screen.getByLabelText("Tags");
    await fireEvent.input(input, { target: { value: "one, two" } });
    await fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenLastCalledWith(["one", "two"]);
  });

  it("rejects invalid pasted values after accepting valid entries", async () => {
    render(TagInput, {
      props: {
        "aria-label": "Emails",
        validateValue: (value: string) => value.includes("@"),
      },
    });
    const input = screen.getByLabelText("Emails");
    await fireEvent.paste(input, {
      clipboardData: { getData: () => "valid@example.com, invalid" },
    });
    expect(screen.getByText('"invalid" is not valid.')).toBeTruthy();
    expect(screen.getByText("valid@example.com")).toBeTruthy();
  });

  it("disables tag removal when disabled", () => {
    render(TagInput, {
      props: { "aria-label": "Tags", defaultValue: ["one"], disabled: true },
    });
    expect(
      screen
        .getByRole("button", { name: "Remove one" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });

  it("associates its label with the input and localizes controls", async () => {
    render(TagInput, {
      props: {
        label: "Etiquetas",
        defaultValue: ["uno"],
        labels: { removeValue: (value: string) => `Eliminar ${value}` },
      },
    });
    const input = screen.getByLabelText("Etiquetas");
    expect(input.id).toContain("kumo-tag-input-");
    expect(screen.getByRole("button", { name: "Eliminar uno" })).toBeTruthy();
  });

  it("removes the final tag with Backspace from an empty input", async () => {
    const onValueChange = vi.fn();
    render(TagInput, {
      props: {
        "aria-label": "Tags",
        defaultValue: ["one", "two"],
        onValueChange,
      },
    });
    await fireEvent.keyDown(screen.getByLabelText("Tags"), {
      key: "Backspace",
    });
    expect(onValueChange).toHaveBeenLastCalledWith(["one"]);
  });
});

it.each([{ isComposing: true }, { keyCode: 229 }])(
  "does not commit IME text (%j)",
  async (init) => {
    const onValueChange = vi.fn();
    render(TagInput, { "aria-label": "IME tags", onValueChange });
    const input = screen.getByLabelText("IME tags");
    await fireEvent.input(input, { target: { value: "にほんご" } });
    for (const key of ["Enter", ",", "Tab"])
      await fireEvent.keyDown(input, { key, ...init });
    expect(onValueChange).not.toHaveBeenCalled();
    expect(input).toHaveValue("にほんご");
    await fireEvent.keyDown(input, { key: "Enter" });
    expect(onValueChange).toHaveBeenLastCalledWith(["にほんご"]);
  },
);

it('keeps read-only tags unchanged and submits accepted tags separately', async () => {
 const view = render(TagInput, { defaultValue: ['one','two'], name: 'tags', readOnly: true, 'aria-label': 'Read only tags' });
 const input = screen.getByLabelText('Read only tags');
 expect(input).toHaveAttribute('readonly');
 expect(screen.getByRole('button', { name: 'Remove one' })).toBeDisabled();
 await fireEvent.keyDown(input, { key: 'Backspace' });
 expect(view.container.querySelectorAll('input[type=hidden][name=tags]')).toHaveLength(2);
 expect(input).not.toHaveAttribute('name');
});
it('merges pasted separators at the draft selection', async () => {
 const onValueChange = vi.fn(); render(TagInput, { onValueChange, 'aria-label': 'Paste tags' });
 const input = screen.getByLabelText('Paste tags') as HTMLInputElement;
 await fireEvent.input(input, { target: { value: 'prefix-tail' } }); input.setSelectionRange(7,7);
 await fireEvent.paste(input, { clipboardData: { getData: () => 'one,two' } });
 expect(onValueChange).toHaveBeenLastCalledWith(['prefix-one','twotail']);
});

it('associates accepted values with an external form and requires an accepted tag', async () => {
 const form = document.createElement('form'); form.id='external-tags'; document.body.append(form);
 const view = render(TagInput, {name:'tags',form:'external-tags',defaultValue:['one','two'],required:true,'aria-label':'External tags'});
 expect(new FormData(form).getAll('tags')).toEqual(['one','two']);
 const input = screen.getByRole('textbox',{name:'External tags'});
 expect(input).not.toHaveAttribute('required');
 await fireEvent.click(screen.getByRole('button',{name:'Remove one'}));
 await fireEvent.click(screen.getByRole('button',{name:'Remove two'}));
 expect(input).toHaveAttribute('required'); expect(new FormData(form).getAll('tags')).toEqual([]);
 view.unmount(); form.remove();
});
