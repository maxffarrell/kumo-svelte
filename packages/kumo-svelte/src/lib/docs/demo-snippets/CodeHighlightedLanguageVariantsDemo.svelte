<script lang="ts">
  import { CodeHighlighted } from 'kumo-svelte';

  const svelteCode = `<script lang="ts">
  let count = $state(0);
<` + `/script>

<button onclick={() => count += 1}>
  Count: {count}
</button>`;
</script>

<div class="grid gap-4 md:grid-cols-2">
  <CodeHighlighted
    code={`interface User {
  id: string;
  name: string;
  email: string;
}

async function fetchUser(id: string): Promise<User> {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`}
    lang="typescript"
  />
  <CodeHighlighted
    code={svelteCode}
    lang="svelte"
  />
  <CodeHighlighted
    code={`# Install Kumo Svelte
npm install kumo-svelte

# Or with pnpm
pnpm add kumo-svelte

# Start development server
pnpm dev`}
    lang="bash"
  />
  <CodeHighlighted
    code={`{
  "name": "kumo-svelte",
  "version": "1.0.0",
  "dependencies": {
    "shiki": "^3.0.0",
    "svelte": "^5.0.0"
  }
}`}
    lang="json"
  />
  <CodeHighlighted
    code={`.button {
  background: var(--color-brand);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  &:hover {
    background: var(--color-brand-hover);
  }
}`}
    lang="css"
  />
</div>
