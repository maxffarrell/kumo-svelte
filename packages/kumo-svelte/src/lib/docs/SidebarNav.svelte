<script lang="ts">
    import { page } from "$app/state";
    import { CaretDownIcon, MagnifyingGlassIcon, XIcon } from "phosphor-svelte";
    import { onMount } from "svelte";
    import { Button } from "$lib";
    import { cn } from "$lib/utils/cn";
    import KumoMenuIcon from "./KumoMenuIcon.svelte";
    import SearchDialog from "./SearchDialog.svelte";
    import ThemeToggle from "./ThemeToggle.svelte";
    import {
        blockItems,
        chartItems,
        componentItems,
        isActivePath,
        normalizePathname,
        staticPages,
        type NavItem,
    } from "./nav";

    const LI_STYLE =
        "block rounded-lg text-kumo-subtle hover:text-kumo-default hover:bg-kumo-tint p-2 my-[.05rem] cursor-pointer transition-colors no-underline relative z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand";
    const LI_ACTIVE_STYLE = "font-semibold text-kumo-default bg-kumo-tint";

    let sidebarOpen = $state(true);
    let mobileMenuOpen = $state(false);
    let componentsOpen = $state(true);
    let chartsOpen = $state(true);
    let blocksOpen = $state(true);
    let searchOpen = $state(false);

    let mobileScrollRef: HTMLDivElement;
    let desktopScrollRef: HTMLDivElement;

    let activePath = $derived(normalizePathname(page.url.pathname));

    function preventPointerFocus(event: MouseEvent) {
        event.preventDefault();
    }

    function saveScroll(event: Event) {
        if (typeof sessionStorage === "undefined") return;
        const target = event.target as HTMLElement;
        sessionStorage.setItem(
            "kumo-sidebar-scroll",
            target.scrollTop.toString(),
        );
    }

    onMount(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === "k") {
                event.preventDefault();
                searchOpen = true;
            }
        };

        const restore = () => {
            const raw = sessionStorage.getItem("kumo-sidebar-scroll");
            const pos = raw ? Number.parseInt(raw, 10) : 0;
            if (!Number.isFinite(pos)) return;
            if (mobileScrollRef) mobileScrollRef.scrollTop = pos;
            if (desktopScrollRef) desktopScrollRef.scrollTop = pos;
        };

        document.addEventListener("keydown", handleKeyDown);
        restore();
        return () => document.removeEventListener("keydown", handleKeyDown);
    });
</script>

{#snippet navLink(item: NavItem, nested = false)}
    <li>
        <a
            href={item.href}
            onmousedown={preventPointerFocus}
            onclick={() => (mobileMenuOpen = false)}
            class={cn(
                LI_STYLE,
                nested && "pl-4",
                (nested
                    ? activePath === normalizePathname(item.href)
                    : isActivePath(activePath, item.href)) && LI_ACTIVE_STYLE,
            )}
        >
            {item.label}
        </a>
    </li>
{/snippet}

{#snippet navSection(
    title: string,
    items: NavItem[],
    open: boolean,
    setOpen: (value: boolean) => void,
    maxHeight = "max-h-[500px]",
)}
    <div class="mb-4">
        <button
            type="button"
            class="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-kumo-default transition-colors hover:bg-kumo-tint focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand"
            onclick={() => setOpen(!open)}
        >
            <span>{title}</span>
            <CaretDownIcon
                size={12}
                class={cn(
                    "text-kumo-subtle transition-transform duration-200",
                    !open && "-rotate-90",
                )}
            />
        </button>
        <ul
            class={cn(
                "mt-1 flex flex-col gap-px overflow-y-hidden overflow-x-visible transition-all duration-300 ease-in-out",
                open ? `${maxHeight} opacity-100` : "max-h-0 opacity-0",
            )}
        >
            {#each items as item (item.href)}
                {@render navLink(item, true)}
            {/each}
        </ul>
    </div>
{/snippet}

{#snippet navContent()}
    <button
        onclick={() => (searchOpen = true)}
        class="mb-3 flex w-full items-center gap-2 rounded-lg bg-kumo-control px-3 py-2 text-sm text-kumo-subtle ring-1 ring-kumo-line transition-all hover:ring-kumo-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-kumo-brand"
    >
        <MagnifyingGlassIcon size={16} class="shrink-0" />
        <span>Search...</span>
    </button>

    <ul class="flex flex-col gap-px">
        {#each staticPages as item (item.href)}
            {@render navLink(item)}
        {/each}
    </ul>

    <div class="my-4 border-b border-kumo-hairline"></div>

    {@render navSection(
        "Components",
        componentItems,
        componentsOpen,
        (value) => (componentsOpen = value),
        "max-h-[2000px]",
    )}
    {@render navSection(
        "Charts",
        chartItems,
        chartsOpen,
        (value) => (chartsOpen = value),
    )}
    {@render navSection(
        "Blocks",
        blockItems,
        blocksOpen,
        (value) => (blocksOpen = value),
    )}
{/snippet}

<div
    class="fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-kumo-hairline bg-kumo-canvas px-3 md:hidden"
>
    <Button
        variant="ghost"
        shape="square"
        aria-label="Open menu"
        onclick={() => (mobileMenuOpen = true)}
    >
        <KumoMenuIcon />
    </Button>
    <h1 class="text-base font-medium">Kumo Svelte</h1>
    <ThemeToggle />
</div>

<aside
    class={cn(
        "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-kumo-hairline bg-kumo-canvas md:hidden",
        "transition-transform duration-300 will-change-transform",
        mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
    )}
>
    <div
        class="flex h-12 flex-none items-center justify-between border-b border-kumo-hairline px-3"
    >
        <h1 class="text-base font-medium">Kumo Svelte</h1>
        <Button
            variant="ghost"
            shape="square"
            aria-label="Close menu"
            onclick={() => (mobileMenuOpen = false)}
        >
            <XIcon size={20} />
        </Button>
    </div>
    <div
        bind:this={mobileScrollRef}
        data-sidebar-scroll="mobile"
        class="min-h-0 grow overflow-y-auto overscroll-contain px-3 py-4 text-sm text-kumo-subtle"
        style:scroll-behavior="auto"
        onscroll={saveScroll}
    >
        {@render navContent()}
    </div>
</aside>

<div
    class="fixed inset-y-0 left-0 z-50 hidden w-12 border-r border-kumo-hairline bg-kumo-canvas md:block"
>
    <div class="relative h-12 border-b border-kumo-hairline">
        <div class="absolute inset-0 grid place-items-center">
            <Button
                variant="ghost"
                shape="square"
                aria-label="Toggle sidebar"
                aria-pressed={sidebarOpen}
                onclick={() => (sidebarOpen = !sidebarOpen)}
            >
                <KumoMenuIcon />
            </Button>
        </div>
    </div>
</div>

<div
    class="pointer-events-none fixed top-0 left-12 z-50 hidden h-12 items-center px-3 font-medium select-none md:flex"
>
    <h1 class="text-base">Kumo Svelte</h1>
</div>

<aside
    data-docs-sidebar
    data-sidebar-open={sidebarOpen}
    class={cn(
        "fixed inset-y-0 left-12 z-40 hidden w-64 flex-col bg-kumo-canvas md:flex",
        "transition-transform duration-300 ease-out will-change-transform",
        sidebarOpen
            ? "translate-x-0 border-r border-kumo-hairline"
            : "-translate-x-full",
    )}
>
    <div class="h-12 flex-none border-b border-kumo-hairline"></div>
    <div
        bind:this={desktopScrollRef}
        data-sidebar-scroll="desktop"
        class="min-h-0 grow overflow-y-auto overscroll-contain px-3 py-4 text-sm text-kumo-subtle"
        onscroll={saveScroll}
    >
        {@render navContent()}
    </div>
</aside>

<SearchDialog open={searchOpen} onOpenChange={(open) => (searchOpen = open)} />
