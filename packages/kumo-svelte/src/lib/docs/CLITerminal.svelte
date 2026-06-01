<script lang="ts">
  import registryJson from '../../../ai/component-registry.json';

  interface PropInfo {
    type: string;
    optional?: boolean;
    required?: boolean;
    values?: string[];
    descriptions?: Record<string, string>;
    default?: string;
    description?: string;
  }

  interface SubComponent {
    description?: string;
    props?: Record<string, PropInfo>;
    renderElement?: string;
  }

  interface ComponentInfo {
    name: string;
    description: string;
    importPath?: string;
    category: string;
    props?: Record<string, PropInfo> | PropInfo[];
    examples?: string[];
    colors?: string[];
    subComponents?: Record<string, SubComponent>;
  }

  interface BlockInfo {
    name: string;
    type: string;
    description: string;
    importPath?: string;
    category: string;
    props?: Record<string, PropInfo>;
    examples?: string[];
    colors?: string[];
    files: string[];
    dependencies: string[];
  }

  interface ComponentRegistry {
    version: string;
    components: Record<string, ComponentInfo>;
    blocks?: Record<string, BlockInfo>;
  }

  type LineType = 'input' | 'output' | 'error';

  interface TerminalLine {
    type: LineType;
    content: string;
  }

  const registry = registryJson as ComponentRegistry;

  const HELP_TEXT = `Kumo Svelte CLI - Component registry and blocks distribution

BLOCKS:
  kumo-svelte init            Initialize kumo.json configuration file
  kumo-svelte blocks          List all available blocks for CLI installation
  kumo-svelte add <block>     Install a block to your project

COMPONENT REGISTRY:
  kumo-svelte ls              List all Kumo Svelte components with categories
  kumo-svelte doc <name>      Get detailed documentation for a component
  kumo-svelte docs            Get documentation for all components

MIGRATION:
  kumo-svelte migrate         Export token rename map for codebase migration
  kumo-svelte migrate --classes  Show class-level mappings

GENERAL:
  kumo-svelte help            Show this help message
  clear                       Clear terminal

Examples:
  kumo-svelte init
  kumo-svelte blocks
  kumo-svelte add PageHeader
  kumo-svelte ls
  kumo-svelte doc Button
  kumo-svelte migrate`;

  let lines = $state<TerminalLine[]>([
    {
      type: 'output',
      content: `Kumo Svelte CLI v${registry.version} - Type "kumo-svelte help" for commands`
    }
  ]);
  let currentInput = $state('');
  let historyIndex = $state(-1);
  let commandHistory = $state<string[]>([]);
  let inputRef = $state<HTMLInputElement>();
  let terminalRef = $state<HTMLDivElement>();

  const exampleCommands = [
    'kumo-svelte help',
    'kumo-svelte blocks',
    'kumo-svelte add PageHeader',
    'kumo-svelte ls',
    'kumo-svelte doc Button'
  ];

  function propEntries(props: ComponentInfo['props']): Array<[string, PropInfo]> {
    if (!props) return [];
    if (Array.isArray(props)) {
      return props.map((prop, index) => [prop.description ? `prop${index + 1}` : `prop${index + 1}`, prop]);
    }
    return Object.entries(props);
  }

  function formatProp(name: string, prop: PropInfo): string[] {
    const propLines: string[] = [];
    let typeStr = prop.type;

    if (prop.values && prop.values.length > 0) {
      typeStr = prop.values.map((value) => `"${value}"`).join(' | ');
    }

    const required = prop.required === true || prop.optional === false;
    const requiredStr = required ? '(required)' : '';
    const defaultStr = prop.default ? `[default: ${prop.default}]` : '';

    propLines.push(`  ${name}: ${typeStr} ${requiredStr} ${defaultStr}`.trim());

    if (prop.descriptions && Object.keys(prop.descriptions).length > 0) {
      for (const [value, description] of Object.entries(prop.descriptions)) {
        propLines.push(`    - "${value}": ${description}`);
      }
    }

    return propLines;
  }

  function formatComponentDoc(component: ComponentInfo): string[] {
    const docLines: string[] = [];

    docLines.push(`# ${component.name}`);
    docLines.push('');
    docLines.push(component.description);
    docLines.push('');
    docLines.push(`Import: import { ${component.name} } from "${component.importPath ?? 'kumo-svelte'}";`);
    docLines.push('');
    docLines.push(`Category: ${component.category}`);
    docLines.push('');

    const importantProps = ['variant', 'size', 'shape'];
    const propsToShow = propEntries(component.props).filter(
      ([name, prop]) => importantProps.includes(name) || prop.values || prop.required
    );

    if (propsToShow.length > 0) {
      docLines.push('## Props');
      docLines.push('');

      for (const [propName, propInfo] of propsToShow.slice(0, 8)) {
        docLines.push(...formatProp(propName, propInfo));
        docLines.push('');
      }

      if (propsToShow.length > 8) {
        docLines.push(`  ... and ${propsToShow.length - 8} more props`);
        docLines.push('');
      }
    }

    if (component.subComponents) {
      docLines.push('## Sub-Components');
      docLines.push('');

      for (const [subName, subInfo] of Object.entries(component.subComponents)) {
        docLines.push(`  ${component.name}.${subName}`);
        if (subInfo.description) {
          docLines.push(`    ${subInfo.description}`);
        }
      }
      docLines.push('');
    }

    if (component.examples && component.examples.length > 0) {
      docLines.push('## Examples');
      docLines.push('');

      for (const example of component.examples.slice(0, 2)) {
        docLines.push(`  ${example}`);
      }

      if (component.examples.length > 2) {
        docLines.push('');
        docLines.push(`  (${component.examples.length - 2} more examples available)`);
      }

      docLines.push('');
    }

    if (component.colors && component.colors.length > 0) {
      docLines.push('## Semantic Tokens');
      docLines.push('');
      docLines.push(`  ${component.colors.join(', ')}`);
    }

    return docLines;
  }

  function executeCommand(input: string, componentRegistry: ComponentRegistry): { output: string[]; isError: boolean } {
    const trimmed = input.trim();
    const parts = trimmed.split(/\s+/);
    const baseCommand = parts[0]?.toLowerCase();

    if (baseCommand === 'clear') {
      return { output: ['__CLEAR__'], isError: false };
    }

    if (baseCommand !== 'kumo-svelte' && baseCommand !== 'npx') {
      if (!trimmed) {
        return { output: [], isError: false };
      }
      return {
        output: [`command not found: ${baseCommand}`, 'Try "kumo-svelte help"'],
        isError: true
      };
    }

    let commandIndex = 1;
    if (baseCommand === 'npx') {
      if (parts[1] === 'kumo-svelte') {
        commandIndex = 2;
      } else {
        return {
          output: [`Unknown package: ${parts[1]}`],
          isError: true
        };
      }
    }

    const command = parts[commandIndex]?.toLowerCase();
    const arg = parts[commandIndex + 1];

    switch (command) {
      case 'ls': {
        const components = Object.values(componentRegistry.components);
        const byCategory = new Map<string, ComponentInfo[]>();

        for (const component of components) {
          const category = component.category || 'Other';
          if (!byCategory.has(category)) {
            byCategory.set(category, []);
          }
          byCategory.get(category)?.push(component);
        }

        const output: string[] = [];
        output.push(`Kumo Svelte Components (${components.length} total)`);
        output.push('');

        for (const category of [...byCategory.keys()].sort()) {
          const categoryComponents = [...(byCategory.get(category) ?? [])].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          output.push(`${category}:`);
          for (const component of categoryComponents) {
            const description =
              component.description.length > 50
                ? `${component.description.slice(0, 47)}...`
                : component.description;
            output.push(`  ${component.name} - ${description}`);
          }
          output.push('');
        }

        return { output, isError: false };
      }

      case 'doc':
      case 'docs': {
        if (!arg && command === 'doc') {
          const output: string[] = [];
          output.push('# Kumo Svelte Component Documentation');
          output.push('');
          output.push(`${Object.keys(componentRegistry.components).length} components available`);
          output.push('');
          output.push('Use "kumo-svelte doc <ComponentName>" for detailed docs');
          output.push('');
          output.push('Components:');

          for (const name of Object.keys(componentRegistry.components).sort()) {
            output.push(`  - ${name}`);
          }

          return { output, isError: false };
        }

        if (arg) {
          const lowerArg = arg.toLowerCase();
          const component = Object.values(componentRegistry.components).find(
            (candidate) => candidate.name.toLowerCase() === lowerArg
          );

          if (!component) {
            const similar = Object.keys(componentRegistry.components)
              .filter(
                (name) =>
                  name.toLowerCase().includes(lowerArg) ||
                  lowerArg.includes(name.toLowerCase())
              )
              .slice(0, 5);

            const output = [`Component "${arg}" not found.`];
            if (similar.length > 0) {
              output.push('');
              output.push(`Did you mean: ${similar.join(', ')}?`);
            }
            output.push('');
            output.push('Run "kumo-svelte ls" to see all available components.');
            return { output, isError: true };
          }

          return { output: formatComponentDoc(component), isError: false };
        }

        const output: string[] = [];
        output.push('# Kumo Svelte Component Documentation');
        output.push('');
        output.push(`${Object.keys(componentRegistry.components).length} components available`);
        output.push('');
        output.push('---');

        for (const component of Object.values(componentRegistry.components).slice(0, 3)) {
          output.push('');
          output.push(...formatComponentDoc(component));
          output.push('');
          output.push('---');
        }

        output.push('');
        output.push(`... and ${Object.keys(componentRegistry.components).length - 3} more components`);
        output.push('');
        output.push('Use "kumo-svelte doc <name>" to see a specific component.');

        return { output, isError: false };
      }

      case 'init': {
        const output: string[] = [];
        output.push('Initializing Kumo Svelte configuration...');
        output.push('');
        output.push('Where should blocks be installed? (src/lib/blocks): src/lib/blocks');
        output.push('');
        output.push('Created kumo.json with the following configuration:');
        output.push('   Blocks directory: src/lib/blocks');
        output.push('');
        output.push('Next steps:');
        output.push('  1. Run "kumo-svelte blocks" to see available blocks');
        output.push('  2. Run "kumo-svelte add <block-name>" to install a block');
        return { output, isError: false };
      }

      case 'blocks': {
        if (!componentRegistry.blocks) {
          return {
            output: ['No blocks available in this version.'],
            isError: true
          };
        }

        const blocks = Object.values(componentRegistry.blocks);
        const byCategory = new Map<string, BlockInfo[]>();

        for (const block of blocks) {
          const category = block.category || 'Other';
          if (!byCategory.has(category)) {
            byCategory.set(category, []);
          }
          byCategory.get(category)?.push(block);
        }

        const output: string[] = [];
        output.push(`Kumo Svelte Blocks (${blocks.length} total)`);
        output.push('');

        for (const category of [...byCategory.keys()].sort()) {
          const categoryBlocks = [...(byCategory.get(category) ?? [])].sort((a, b) =>
            a.name.localeCompare(b.name)
          );

          output.push(`${category}:`);
          for (const block of categoryBlocks) {
            const description =
              block.description.length > 60
                ? `${block.description.slice(0, 57)}...`
                : block.description;
            output.push(`  ${block.name} - ${description}`);
          }
          output.push('');
        }

        output.push('To install a block, run:');
        output.push('  kumo-svelte add <block-name>');
        output.push('');
        output.push('Example:');
        output.push('  kumo-svelte add PageHeader');

        return { output, isError: false };
      }

      case 'add': {
        if (!arg) {
          return {
            output: [
              'Error: Block name is required.',
              '',
              'Usage: kumo-svelte add <block-name>',
              'Run "kumo-svelte blocks" to see available blocks.'
            ],
            isError: true
          };
        }

        const blockName = arg;
        const block = componentRegistry.blocks?.[blockName];

        if (!block) {
          const lowerArg = arg.toLowerCase();
          const matchedBlock = Object.values(componentRegistry.blocks || {}).find(
            (candidate) => candidate.name.toLowerCase() === lowerArg
          );

          if (matchedBlock) {
            return executeCommand(`kumo-svelte add ${matchedBlock.name}`, componentRegistry);
          }

          const output = [`Error: Block '${blockName}' not found.`];
          output.push('Run "kumo-svelte blocks" to see available blocks.');
          return { output, isError: true };
        }

        const output: string[] = [];
        output.push(`Installing block: ${block.name}`);

        for (const file of block.files) {
          output.push(`  ${file}`);
        }
        output.push('');

        if (block.dependencies && block.dependencies.length > 0) {
          output.push('This block depends on the following Kumo Svelte components:');
          for (const dependency of block.dependencies) {
            output.push(`  - ${dependency} (from kumo-svelte)`);
          }
          output.push('');
          output.push('Make sure kumo-svelte is installed in your project:');
          output.push('  pnpm add kumo-svelte');
          output.push('');
        }

        output.push(`Successfully installed ${block.name}!`);
        output.push('');
        output.push('You can now import it in your project:');

        const mainFile = block.files.find(
          (file) =>
            (file.endsWith('.svelte') || file.endsWith('.ts')) &&
            !file.includes('.stories') &&
            !file.includes('.test') &&
            !file.endsWith('index.ts')
        );

        if (mainFile) {
          const importPath = mainFile.replace(/\.(svelte|ts)$/, '').replace(/\//g, '/');
          output.push(`  import ${block.name} from "src/lib/blocks/${importPath}.svelte";`);
        }

        return { output, isError: false };
      }

      case 'migrate': {
        return {
          output: [
            'No pending token migrations.',
            '',
            'Your codebase is up to date with the current Kumo Svelte version.',
            'Token migrations are only needed when upgrading to versions',
            'that include breaking changes to token names.'
          ],
          isError: false
        };
      }

      case 'help':
      case '--help':
      case '-h':
      case undefined: {
        return { output: HELP_TEXT.split('\n'), isError: false };
      }

      default: {
        return {
          output: [`Unknown command: ${command}`, '', HELP_TEXT],
          isError: true
        };
      }
    }
  }

  function scrollToBottom() {
    if (terminalRef) {
      terminalRef.scrollTop = terminalRef.scrollHeight;
    }
  }

  $effect(() => {
    lines;
    requestAnimationFrame(scrollToBottom);
  });

  function focusInput() {
    inputRef?.focus({ preventScroll: true });
  }

  function handleSubmit() {
    if (!currentInput.trim() && !currentInput) {
      lines = [...lines, { type: 'input', content: '' }];
      return;
    }

    const input = currentInput;
    currentInput = '';

    if (input.trim()) {
      commandHistory = [...commandHistory, input];
    }
    historyIndex = -1;

    const newLines: TerminalLine[] = [{ type: 'input', content: input }];
    const { output, isError } = executeCommand(input, registry);

    if (output[0] === '__CLEAR__') {
      lines = [];
      return;
    }

    for (const line of output) {
      newLines.push({
        type: isError ? 'error' : 'output',
        content: line
      });
    }

    lines = [...lines, ...newLines];
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        historyIndex = newIndex;
        currentInput = commandHistory[newIndex];
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          historyIndex = -1;
          currentInput = '';
        } else {
          historyIndex = newIndex;
          currentInput = commandHistory[newIndex];
        }
      }
    } else if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      lines = [];
    }
  }
</script>

<div class="flex flex-col gap-4">
  <div class="text-sm text-kumo-default">
    <div class="flex flex-wrap gap-2">
      {#each exampleCommands as command}
        <button
          type="button"
          onclick={() => {
            currentInput = command;
            focusInput();
          }}
          class="rounded bg-kumo-overlay px-2 py-1 font-mono text-xs text-kumo-default transition-colors hover:bg-kumo-recessed"
        >
          {command}
        </button>
      {/each}
    </div>
  </div>

  <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <div
    bind:this={terminalRef}
    role="application"
    tabindex="0"
    onclick={focusInput}
    onkeydown={(event) => {
      if (event.target !== event.currentTarget) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        focusInput();
      }
    }}
    class="relative h-[500px] w-full max-w-[800px] cursor-text overflow-x-auto overflow-y-auto overscroll-contain rounded-lg bg-black p-4 font-mono text-sm text-white"
  >
    {#each lines as line, index}
      {@const previousLine = lines[index - 1]}
      {@const isFirstOutputAfterInput = line.type !== 'input' && previousLine?.type === 'input'}
      <div class="whitespace-pre-wrap" class:mt-1={isFirstOutputAfterInput}>
        {#if line.type === 'input'}
          <span class="text-kumo-success"><span>$</span> {line.content}</span>
        {:else if line.type === 'error'}
          <span class="text-kumo-danger">{line.content}</span>
        {:else}
          <span class="text-kumo-success opacity-90">{line.content}</span>
        {/if}
      </div>
    {/each}

    <div class="flex items-center">
      <span class="text-kumo-success">$</span>
      <span class="mx-1 text-kumo-success">{currentInput}</span>
      <span class="ml-0.5 inline-block h-4 w-2 animate-pulse bg-white"></span>
      <input
        bind:this={inputRef}
        type="text"
        bind:value={currentInput}
        onkeydown={handleKeydown}
        class="absolute opacity-0"
        aria-label="Terminal input"
      />
    </div>
  </div>

  <p class="text-xs text-kumo-subtle">Tip: Use arrow keys for command history, Ctrl+L to clear</p>
</div>
