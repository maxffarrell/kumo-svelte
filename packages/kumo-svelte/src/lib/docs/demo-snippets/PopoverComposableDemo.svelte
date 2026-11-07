<script lang="ts">
  import { Popover, Button } from "#lib/index.js";
</script>

<Popover.Root
  ><Popover.Trigger
    >{#snippet child({ props })}<Button {...props}>Open composed popover</Button
      >{/snippet}</Popover.Trigger
  ><Popover.Portal
    ><Popover.Positioner
      ><Popover.Popup class="w-72"
        ><Popover.Arrow /><Popover.Title>Notifications</Popover.Title
        ><Popover.Description
          >The list scrolls while the arrow stays in place.</Popover.Description
        >
        <div class="mt-3 max-h-40 overflow-y-auto">
          {#each Array.from({ length: 12 }) as _, index}<div
              class="border-b border-kumo-hairline px-3 py-2"
            >
              Notification {index + 1}
            </div>{/each}
        </div>
        <Popover.Close>Close</Popover.Close></Popover.Popup
      ></Popover.Positioner
    ></Popover.Portal
  ></Popover.Root
>
