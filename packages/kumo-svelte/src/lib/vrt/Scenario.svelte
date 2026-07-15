<script lang="ts">
  import type { Snippet } from 'svelte';

  /** A single interaction the VRT runner performs before capturing. */
  export interface VrtAction {
    type: 'hover' | 'focus' | 'click' | 'press';
    /** Key for `press` (Playwright syntax, e.g. "Enter", "ArrowDown"). */
    key?: string;
    /** Sub-selector relative to the scenario target; defaults to first interactive element. */
    selector?: string;
  }

  interface Props {
    /** Stable scenario id; becomes part of the screenshot filename. */
    id: string;
    /** Optional human label shown above the case (excluded from the screenshot target). */
    label?: string;
    /**
     * Interactions the runner applies before capturing (hover/focus/click/press).
     * When set, the runner loads a fresh page, applies these, then screenshots —
     * so pseudo-state and overlay captures stay isolated.
     */
    interact?: VrtAction[];
    /**
     * What to screenshot:
     *  - "target" (default): this scenario wrapper.
     *  - "page": the whole viewport — use for Bits-UI overlays that portal to body
     *    (dialog, popover, select, dropdown, tooltip, combobox, command-palette).
     */
    capture?: 'target' | 'page';
    children: Snippet;
  }

  let { id, label, interact, capture, children }: Props = $props();
</script>

<div class="vr-case">
  {#if label}
    <div class="vr-case__label" data-vr-ignore>{label}</div>
  {/if}
  <div
    class="vr-case__target"
    data-vr-scenario={id}
    data-vr-interact={interact ? JSON.stringify(interact) : undefined}
    data-vr-capture={capture}
  >
    {@render children()}
  </div>
</div>

<style>
  .vr-case {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .vr-case__label {
    font-size: 11px;
    line-height: 1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: var(--text-color-kumo-subtle);
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  }

  /* The screenshot target: width:max-content so the captured box hugs the
     component, keeping diffs tight and layout-independent. */
  .vr-case__target {
    width: max-content;
    max-width: 100%;
  }
</style>
