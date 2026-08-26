<script lang="ts">
  import { Sidebar, useSidebar } from './index';

  const sidebar = useSidebar();
</script>

<Sidebar>
  <Sidebar.Content>
    <Sidebar.Menu>
      <Sidebar.MenuButton itemId="billing" tooltip="Billing">Billing</Sidebar.MenuButton>
    </Sidebar.Menu>
  </Sidebar.Content>
</Sidebar>
<button type="button" onclick={() => sidebar.scrollToItem('billing', { align: 'center', behavior: 'smooth' })}>
  Find billing
</button>
