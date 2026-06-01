---
title: "Contributing"
description: "Learn how to contribute to Kumo, from setup and workflows to PR and release guidelines. Everything you need for setup, development, quality checks, and PR process is documented here."
contentLayout: "wide"
---

<script>
  import Callout from '$lib/docs/Callout.svelte';
  import ComponentExample from '$lib/docs/ComponentExample.svelte';
  import ComponentSection from '$lib/docs/ComponentSection.svelte';
  import CodeBlock from '$lib/docs/CodeBlock.svelte';
  import PropsTable from '$lib/docs/PropsTable.svelte';
</script>

<section class="not-prose border-b border-kumo-hairline pb-8 md:pb-9">
  <h2 id="before-you-start" class="mb-6 text-3xl leading-tight font-semibold tracking-normal text-kumo-default md:mb-8 md:text-[40px]">
    <a href="#before-you-start">Before You Start</a>
  </h2>
  <p class="mb-5 text-lg leading-normal text-kumo-default md:mb-6 md:text-2xl">
    For non-trivial changes, start with alignment before coding:
  </p>
  <ul class="m-0 flex list-disc flex-col gap-3 pl-8 text-lg leading-normal text-kumo-default md:gap-4 md:pl-12 md:text-2xl">
    <li class="pl-2">Comment on an existing issue or open one first.</li>
    <li class="pl-2">Confirm scope, API direction, and migration impact.</li>
    <li class="pl-2">For small fixes/docs tweaks, you can go straight to a PR.</li>
  </ul>
</section>

## 1. Get Set Up Once

From repo root:

```bash
pnpm install
pnpm build
```

Requirements:

- Node `^24.12.0`
- pnpm `&gt;=10.21.0`

Recommended local setup:

- Use a Node version manager (`nvm`, `fnm`, etc.).
- Use VS Code and select the workspace TypeScript version.
- If dependencies changed after rebase, run `pnpm install` again.

### Repository Access and Branching

Internal contributors normally clone and push directly to `maxffarrell/kumo-svelte`:

```bash
git clone https://github.com/maxffarrell/kumo-svelte.git
git switch -c <branch-name>
git push -u origin <branch-name>
```

If you do not have write access, contact your manager or Kumo maintainers.

---

## 2. Pick the Right Contribution Type

Use this to decide where your change belongs:

- **Component**: reusable UI primitive in `packages/kumo-svelte/src/lib/components/`
- **Block**: documented composition pattern in `packages/kumo-svelte/src/routes/blocks/` with any supporting code kept near the local docs/component surface
- **Docs only**: docs pages, demo snippets, and navigation updates in `packages/kumo-svelte/src/routes/` or `packages/kumo-svelte/src/lib/docs/`

When adding a new **component**, scaffold it (do not create files manually):

```bash
pnpm --filter kumo-svelte new:component
```

---

## 3. Start the Dev Loop

Run these in separate terminals:

```bash
# Terminal 1: watch Kumo package output
pnpm --filter kumo-svelte dev

# Terminal 2: docs site
pnpm dev
```

This gives you a fast loop while verifying your change in the actual docs environment.

---

## 4. Implement the Change

Typical internal change flow:

1. Build the feature in `packages/kumo-svelte/src/lib/...`.
2. Add or update demos in `packages/kumo-svelte/src/lib/docs/demo-snippets/`.
3. Add/update tests in `packages/kumo-svelte`.
4. Add or update docs pages in `packages/kumo-svelte/src/routes/`.

If your demos should appear in registry metadata, keep demo naming exact:

- File: `&#123;Component&#125;Demo.svelte`
- Demo component names should end with `Demo`

Implementation expectations:

- Preserve accessibility semantics and keyboard behavior.
- Keep APIs focused and avoid one-off abstractions.
- Follow existing Kumo patterns for variants, props, and structure.

---

## 5. Run Validation Before PR

Run these from repo root before opening or updating your PR:

```bash
pnpm lint
pnpm typecheck
pnpm --filter kumo-svelte test
```

If you changed exports/build behavior, also run:

```bash
pnpm --filter kumo-svelte build
```

Optional (when relevant):

```bash
pnpm format
pnpm --filter kumo-svelte test:run
```

Windsurf and hooks catch additional issues, but you should still run checks locally before requesting review.

---

## 6. Handle Changesets Correctly

If your change touches `packages/kumo-svelte/` and should ship, add a changeset:

```bash
pnpm changeset
```

Changeset guidance:

- Use `patch` for bug fixes and low-risk improvements.
- Use `minor` for new backward-compatible features.
- Use `major` only for breaking changes.
- Keep the summary focused on user-visible impact.

If your change is docs-only or non-releasable package work, a changeset is usually not required.

---

## 7. Open and Maintain the PR

- Branch from `main` and push to `origin`.
- Use PR title format: `[package] short description` (example: `[kumo] add meter warning variant`).
- Fill in the PR template with testing details and impact.
- After review starts, prefer follow-up commits over force-pushing rewritten history.

Git hygiene expectations:

- Keep commit history readable before first review.
- After reviews begin, avoid rewriting already-reviewed commits.
- Add follow-up commits for feedback (`fixup` commits are fine).

PR review is required before merge.

---

## PR Previews and Tests

- PRs publish prerelease artifacts via `pkg.pr.new` links in CI comments.
- Every PR should include tests for behavior changes.
- Most Kumo Svelte tests are Vitest-based and live under `packages/kumo-svelte`.

---

## Release Process (How Your Change Ships)

- Releases are managed through Changesets.
- Merged changesets on `main` feed the automated versioning/publish flow.
- If you need an urgent out-of-cadence release, contact maintainers.

---

## Practical Guidelines

- Use semantic Kumo tokens and avoid raw Tailwind color classes.
- Compose class names with `cn(...)`.
- Prefer extending existing patterns over introducing one-off API designs.
- Include tests for behavior changes, not just rendering snapshots.

Common pitfalls to avoid:

- Do not scaffold components manually; use `new:component`.
- Do not rely on raw Tailwind color classes (`bg-blue-500`, etc.).
- Do not skip changesets for releasable `packages/kumo-svelte` changes.

---

## Related Docs

Follow the local `.changeset/README.md` to document releasable library changes and see this repo's `AGENTS.md` files for conventions and patterns.
