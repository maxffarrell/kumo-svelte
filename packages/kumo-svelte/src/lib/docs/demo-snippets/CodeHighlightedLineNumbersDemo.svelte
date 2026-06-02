<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const svelteCode = `<script lang="ts">
  let size = $state({ width: 0, height: 0 });

  function handleResize() {
    size = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  $effect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
<` + `/script>`;
</script>

<CodeHighlighted code={svelteCode} lang="svelte" showLineNumbers />
