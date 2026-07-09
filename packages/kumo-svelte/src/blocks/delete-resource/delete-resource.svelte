<script module lang="ts">
  export const KUMO_DELETE_RESOURCE_VARIANTS = {
    size: {
      sm: {
        classes: '',
        description: 'Small dialog for simple delete confirmations'
      },
      base: {
        classes: '',
        description: 'Default delete confirmation dialog size'
      }
    }
  } as const;

  export const KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  type DeleteResourceSize = keyof typeof KUMO_DELETE_RESOURCE_VARIANTS.size;
</script>

<script lang="ts">
  import { Banner } from '$lib/components/banner';
  import { Button } from '$lib/components/button';
  import { Dialog } from '$lib/components/dialog';
  import { Input } from '$lib/components/input';
  import { cn } from '$lib/utils/cn';
  import Check from 'phosphor-svelte/lib/Check';
  import Copy from 'phosphor-svelte/lib/Copy';
  import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
  import X from 'phosphor-svelte/lib/X';

  interface Props {
    resourceType: string;
    resourceName: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    deleteButtonText?: string;
    errorMessage?: string;
    isDeleting?: boolean;
    caseSensitive?: boolean;
    size?: DeleteResourceSize;
    onDelete: () => void | Promise<void>;
    class?: string;
  }

  let {
    resourceType,
    resourceName,
    open = $bindable(false),
    onOpenChange,
    deleteButtonText,
    errorMessage,
    isDeleting = false,
    caseSensitive = true,
    size = KUMO_DELETE_RESOURCE_DEFAULT_VARIANTS.size,
    onDelete,
    class: className
  }: Props = $props();

  let confirmationInput = $state('');
  let copied = $state(false);
  let copyTimer: ReturnType<typeof setTimeout> | undefined;

  const normalizedInput = $derived(caseSensitive ? confirmationInput : confirmationInput.toLowerCase());
  const normalizedName = $derived(caseSensitive ? resourceName : resourceName.toLowerCase());
  const isConfirmed = $derived(normalizedInput === normalizedName);

  function setOpen(nextOpen: boolean) {
    open = nextOpen;
    onOpenChange?.(nextOpen);
    if (!nextOpen) {
      confirmationInput = '';
      copied = false;
    }
  }

  async function handleDelete() {
    if (!isConfirmed || isDeleting) return;
    await onDelete();
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(resourceName);
    copied = true;
    if (copyTimer) clearTimeout(copyTimer);
    copyTimer = setTimeout(() => {
      copied = false;
    }, 1500);
  }

  $effect(() => {
    if (!open) {
      confirmationInput = '';
      copied = false;
    }
  });
</script>

<Dialog
  bind:open
  {size}
  class={cn('p-0', className)}
  onOpenChange={setOpen}
>
  <div class="flex items-center justify-between border-b border-kumo-line px-6 py-4">
    <h2 class="text-lg font-semibold">Delete {resourceName}</h2>
    <Button
      variant="ghost"
      shape="square"
      size="sm"
      aria-label="Close"
      disabled={isDeleting}
      onclick={() => setOpen(false)}
    >
      <X size={18} />
    </Button>
  </div>

  <div class="flex flex-col p-6 gap-4">
    <div class="flex flex-col gap-2">
      {#if errorMessage}
        <Banner variant="error" icon={WarningCircle}>{errorMessage}</Banner>
      {/if}
      <p class="text-base text-kumo-subtle max-w-prose text-pretty">
        This action cannot be undone. This will permanently delete the
        <span class="font-medium text-kumo-default">{resourceName}</span>
        {resourceType.toLowerCase()}.
      </p>
    </div>

    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-1.5 text-base">
        <span>
          Type
          <button
            type="button"
            class="font-mono text-sm inline font-semibold bg-kumo-tint hover:bg-kumo-fill rounded-md px-2 py-1 group hover:cursor-pointer"
            onclick={handleCopy}
            aria-label={`Copy ${resourceName} to clipboard`}
          >
            {resourceName}
            {#if copied}
              <Check size={12} weight="bold" class="inline ml-1.5" />
            {:else}
              <Copy size={12} weight="bold" class="inline text-kumo-subtle group-hover:text-kumo-default ml-1.5" />
            {/if}
          </button>
          to confirm:
        </span>
      </div>
      <Input
        placeholder={resourceName}
        bind:value={confirmationInput}
        disabled={isDeleting}
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck={false}
        aria-label={`Type ${resourceName} to confirm deletion`}
        class="w-full"
      />
    </div>
  </div>

  <div class="flex justify-end gap-3 border-t border-kumo-line px-6 py-4">
    <Button variant="secondary" disabled={isDeleting} onclick={() => setOpen(false)}>Cancel</Button>
    <Button variant="destructive" onclick={handleDelete} disabled={!isConfirmed || isDeleting} loading={isDeleting}>
      {deleteButtonText || `Delete ${resourceType}`}
    </Button>
  </div>
</Dialog>
