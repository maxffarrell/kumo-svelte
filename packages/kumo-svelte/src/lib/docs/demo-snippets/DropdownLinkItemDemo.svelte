<script lang="ts">
  import ArrowSquareOut from 'phosphor-svelte/lib/ArrowSquareOut';
  import BookOpen from 'phosphor-svelte/lib/BookOpen';
  import Gear from 'phosphor-svelte/lib/Gear';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button>Resources</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.LinkItem href="/settings" icon={Gear}>
      Settings
    </DropdownMenu.LinkItem>
    <DropdownMenu.LinkItem href="/docs" icon={BookOpen}>
      Documentation
    </DropdownMenu.LinkItem>
    <DropdownMenu.Separator />
    <DropdownMenu.LinkItem
      href="https://developers.cloudflare.com"
      target="_blank"
      icon={ArrowSquareOut}
    >
      Developer Docs
    </DropdownMenu.LinkItem>
  </DropdownMenu.Content>
</DropdownMenu>
