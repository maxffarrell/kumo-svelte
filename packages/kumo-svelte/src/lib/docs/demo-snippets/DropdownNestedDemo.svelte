<script lang="ts">
  import CreditCard from 'phosphor-svelte/lib/CreditCard';
  import Moon from 'phosphor-svelte/lib/Moon';
  import SignOut from 'phosphor-svelte/lib/SignOut';
  import User from 'phosphor-svelte/lib/User';
  import { Button } from 'kumo-svelte/components/button';
  import { DropdownMenu } from 'kumo-svelte/components/dropdown-menu';

  const languages = [
    { code: 'de', label: 'Deutsch' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'pt', label: 'Português' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
    { code: 'zh-CN', label: '简体中文' },
    { code: 'zh-TW', label: '繁體中文' }
  ];

  const timezones = [
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' }
  ];

  let language = $state('en');
  let timezone = $state('America/Los_Angeles');
</script>

<DropdownMenu>
  <DropdownMenu.Trigger>
    <Button icon={User}>Account</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Item icon={User}>Profile</DropdownMenu.Item>
    <DropdownMenu.Item icon={CreditCard}>Billing</DropdownMenu.Item>
    <DropdownMenu.Item icon={Moon}>Dark mode</DropdownMenu.Item>

    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>Language</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Group>
          <DropdownMenu.RadioGroup bind:value={language}>
            {#each languages as lang}
              <DropdownMenu.RadioItem value={lang.code}>
                {lang.label}
                <DropdownMenu.RadioItemIndicator />
              </DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>

    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger>Set Timezone</DropdownMenu.SubTrigger>
      <DropdownMenu.SubContent>
        <DropdownMenu.Group>
          <DropdownMenu.RadioGroup bind:value={timezone}>
            {#each timezones as tz}
              <DropdownMenu.RadioItem value={tz.value}>
                {tz.label}
                <DropdownMenu.RadioItemIndicator />
              </DropdownMenu.RadioItem>
            {/each}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Group>
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>

    <DropdownMenu.Separator />
    <DropdownMenu.Item icon={SignOut} variant="danger">Log out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu>
