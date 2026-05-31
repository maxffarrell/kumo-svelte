<script lang="ts" module>
  export const KUMO_LOADER_VARIANTS = {
    size: {
      xs: {
        value: 12,
        description: 'Extra small loader for compact controls'
      },
      sm: {
        value: 16,
        description: 'Small loader for inline use'
      },
      base: {
        value: 24,
        description: 'Default loader size'
      },
      lg: {
        value: 32,
        description: 'Large loader for prominent loading states'
      }
    }
  } as const;

  export const KUMO_LOADER_DEFAULT_VARIANTS = {
    size: 'base'
  } as const;

  export type KumoLoaderSize = keyof typeof KUMO_LOADER_VARIANTS.size;

  export function loaderVariants(size: KumoLoaderSize | number = KUMO_LOADER_DEFAULT_VARIANTS.size): number {
    if (typeof size === 'number') return size;
    return KUMO_LOADER_VARIANTS.size[size]?.value ?? KUMO_LOADER_VARIANTS.size[KUMO_LOADER_DEFAULT_VARIANTS.size].value;
  }

</script>

<script lang="ts">
  interface Props {
    class?: string;
    size?: KumoLoaderSize | number;
    'aria-label'?: string;
    [key: string]: unknown;
  }

  let {
    class: className,
    size = KUMO_LOADER_DEFAULT_VARIANTS.size,
    'aria-label': ariaLabel = 'Loading',
    ...rest
  }: Props = $props();

  let sizeValue = $derived(loaderVariants(size));
</script>

<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  xmlns="http://www.w3.org/2000/svg"
  stroke="currentColor"
  class={className}
  style:height={`${sizeValue}px`}
  style:width={`${sizeValue}px`}
  role="status"
  aria-label={ariaLabel}
  {...rest}
>
  <circle cx="12" cy="12" r="9.5" fill="none" stroke-width="2" stroke-linecap="round">
    <animateTransform
      attributeName="transform"
      type="rotate"
      from="0 12 12"
      to="360 12 12"
      dur="2s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="stroke-dasharray"
      values="0 150;42 150;42 150"
      keyTimes="0;0.5;1"
      dur="1.5s"
      repeatCount="indefinite"
    />
    <animate
      attributeName="stroke-dashoffset"
      values="0;-16;-59"
      keyTimes="0;0.5;1"
      dur="1.5s"
      repeatCount="indefinite"
    />
  </circle>
  <circle cx="12" cy="12" r="9.5" fill="none" opacity="0.1" stroke-width="2" stroke-linecap="round" />
</svg>

<style>
</style>
