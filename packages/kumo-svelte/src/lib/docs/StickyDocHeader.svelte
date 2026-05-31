<script lang="ts">
    import { GithubLogoIcon } from "phosphor-svelte";
    import { onMount } from "svelte";
    import { cn } from "$lib/utils/cn";
    import ThemeToggle from "./ThemeToggle.svelte";
    import BaseUIIcon from "./BaseUIIcon.svelte";

    interface Props {
        title: string;
        githubSourceUrl?: string | null;
        bitsUIUrl?: string | null;
    }

    let { title, githubSourceUrl = null, bitsUIUrl = null }: Props = $props();

    const safeGithubSourceUrl = $derived(githubSourceUrl);
    let showStickyTitle = $state(false);
    let sidebarOpen = $state(true);
    let headerRef: HTMLElement;

    onMount(() => {
        const sidebar = document.querySelector(
            "aside[data-docs-sidebar][data-sidebar-open]",
        );
        const checkSidebarState = () => {
            if (sidebar)
                sidebarOpen =
                    sidebar.getAttribute("data-sidebar-open") === "true";
        };

        checkSidebarState();
        const sidebarObserver = sidebar
            ? new MutationObserver(checkSidebarState)
            : null;
        sidebarObserver?.observe(sidebar!, {
            attributes: true,
            attributeFilter: ["data-sidebar-open"],
        });

        const pageHeader = document.getElementById("page-header");
        const margin = headerRef
            ? Math.round(headerRef.getBoundingClientRect().bottom)
            : 48;
        const headerObserver =
            pageHeader &&
            new IntersectionObserver(
                ([entry]) => {
                    showStickyTitle = !entry.isIntersecting;
                },
                { rootMargin: `-${margin}px 0px 0px 0px` },
            );

        if (pageHeader && headerObserver) headerObserver.observe(pageHeader);

        return () => {
            sidebarObserver?.disconnect();
            headerObserver?.disconnect();
        };
    });
</script>

{#if !sidebarOpen}
    <div
        class={cn(
            "pointer-events-none fixed top-0 left-12 z-50 flex h-12 items-center font-medium transition-opacity duration-200 select-none",
            showStickyTitle ? "opacity-100" : "opacity-0",
        )}
        style="padding-left: 4.25rem"
    >
        <span class="pointer-events-auto flex items-center gap-2 text-base">
            <span class="text-kumo-subtle">/ </span>
            <span class="font-semibold tracking-tight">{title}</span>
            {#if safeGithubSourceUrl}
                <a
                    href={safeGithubSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-kumo-subtle transition-colors hover:text-kumo-default"
                    title="View source on GitHub"
                    aria-label="View source on GitHub"
                    tabindex={showStickyTitle ? 0 : -1}
                >
                    <GithubLogoIcon size={18} weight="fill" />
                </a>
            {/if}
            {#if bitsUIUrl}
                <a
                    href={bitsUIUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-kumo-subtle transition-colors hover:text-kumo-default"
                    title="View Bits UI documentation"
                    aria-label="View Bits UI documentation"
                    tabindex={showStickyTitle ? 0 : -1}
                >
                    <BaseUIIcon size={18} />
                </a>
            {/if}
        </span>
    </div>
{/if}

<header
    bind:this={headerRef}
    class="sticky top-12 z-10 flex h-12 border-b border-kumo-hairline bg-kumo-elevated md:top-0"
>
    <div
        class="flex min-w-0 flex-1 items-center justify-between px-4 md:border-r md:border-kumo-hairline"
    >
        <div
            class={cn(
                "flex items-center gap-2 transition-opacity duration-200",
                showStickyTitle && sidebarOpen
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
            )}
        >
            <span class="text-lg font-semibold tracking-tight text-kumo-default"
                >{title}</span
            >
            {#if safeGithubSourceUrl}
                <a
                    href={safeGithubSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-kumo-subtle transition-colors hover:text-kumo-default"
                    title="View source on GitHub"
                    aria-label="View source on GitHub"
                    tabindex={showStickyTitle && sidebarOpen ? 0 : -1}
                >
                    <GithubLogoIcon size={20} weight="fill" />
                </a>
            {/if}
            {#if bitsUIUrl}
                <a
                    href={bitsUIUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-kumo-subtle transition-colors hover:text-kumo-default"
                    title="View Bits UI documentation"
                    aria-label="View Bits UI documentation"
                    tabindex={showStickyTitle && sidebarOpen ? 0 : -1}
                >
                    <BaseUIIcon size={20} />
                </a>
            {/if}
        </div>
        <a
            href="https://github.com/maxffarrell/kumo-svelte"
            target="_blank"
            rel="noopener noreferrer"
            class="font-mono text-sm text-kumo-subtle transition-colors hover:text-kumo-default"
        >
            kumo-svelte
        </a>
    </div>
    <div class="hidden w-12 shrink-0 items-center justify-center md:flex">
        <ThemeToggle />
    </div>
</header>
