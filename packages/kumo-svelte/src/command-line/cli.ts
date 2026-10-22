#!/usr/bin/env node
import "./check-node.js";
import { add } from './commands/add.js';
import { ai } from './commands/ai.js';
import { blocks } from './commands/blocks.js';
import { doc } from './commands/doc.js';
import { init } from './commands/init.js';
import { ls } from './commands/ls.js';
import { migrate } from './commands/migrate.js';

const HELP = `
Kumo Svelte CLI - Component registry and blocks distribution

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
  kumo-svelte migrate --classes  Show class-level mappings (bg-kumo-base -> bg-kumo-base)
  kumo-svelte migrate --help     Show migration help

AI:
  kumo-svelte ai              Print the AI usage guide (component API reference)

GENERAL:
  kumo-svelte help            Show this help message

Examples:
  kumo-svelte init
  kumo-svelte blocks
  kumo-svelte add PageHeader
  kumo-svelte ls
  kumo-svelte doc Button
  kumo-svelte docs
  kumo-svelte migrate --json > rename-map.json
`;

async function main() {
  const args = process.argv.slice(2);
  const command = args[0]?.toLowerCase();

  switch (command) {
    case 'init':
      await init();
      break;
    case 'blocks':
      blocks();
      break;
    case 'add':
      await add(args[1]);
      break;
    case 'ls':
      ls();
      break;
    case 'doc':
    case 'docs':
      doc(args[1]);
      break;
    case 'migrate':
      migrate(args.slice(1));
      break;
    case 'ai':
      ai();
      break;
    case 'help':
    case '--help':
    case '-h':
    case undefined:
      console.log(HELP.trim());
      break;
    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP.trim());
      process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
