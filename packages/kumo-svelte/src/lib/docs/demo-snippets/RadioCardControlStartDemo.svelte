<script lang="ts">
  import { Radio } from '$lib';

  const radioOptions = [
      { label: 'Production', value: 'production', description: 'Route live traffic.' },
      { label: 'Preview', value: 'preview', description: 'Test before release.' },
      { label: 'Disabled', value: 'disabled', disabled: true }
    ];
</script>

<div class="flex min-h-24 w-full items-center justify-center">
<div class={'grid gap-3'}>
      {#if !false}<p class={'text-sm font-medium text-kumo-default'}>{'Plan'}</p>{/if}
      <Radio options={radioOptions} value={'production'} />
      
    </div>
</div>
