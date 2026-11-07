<script lang="ts">
  import { DropdownMenu, Button } from "#lib/index.js";
  import Plus from "phosphor-svelte/lib/Plus";
</script>

<DropdownMenu
  ><DropdownMenu.Trigger
    >{#snippet child({ props })}<Button {...props}>Open composed menu</Button
      >{/snippet}</DropdownMenu.Trigger
  ><DropdownMenu.Portal
    ><DropdownMenu.Positioner
      ><DropdownMenu.Popup
        ><DropdownMenu.Item icon={Plus}>Create</DropdownMenu.Item
        ><DropdownMenu.Item>Duplicate</DropdownMenu.Item><DropdownMenu.Sub
          ><DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger
          ><DropdownMenu.SubContent
            ><DropdownMenu.Item>Archive</DropdownMenu.Item
            ></DropdownMenu.SubContent
          ></DropdownMenu.Sub
        ></DropdownMenu.Popup
      ></DropdownMenu.Positioner
    ></DropdownMenu.Portal
  ></DropdownMenu
>
