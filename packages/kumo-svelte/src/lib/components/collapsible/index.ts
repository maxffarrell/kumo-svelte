import Root from './Collapsible.svelte';
import type { KumoCollapsiblePart } from './Collapsible.svelte';

const part = (part: KumoCollapsiblePart) =>
  ((anchor: any, props: Record<string, unknown> = {}) =>
    (Root as any)(anchor, {
      ...props,
      __part: part
    })) as unknown as typeof Root;

const CollapsibleRoot = part('root');
const Trigger = part('trigger');
const Panel = part('panel');
const DefaultTrigger = part('default-trigger');
const DefaultPanel = part('default-panel');

const Collapsible = Object.assign(Root, {
  Root: CollapsibleRoot,
  Trigger,
  Panel,
  DefaultTrigger,
  DefaultPanel
}) as typeof Root & {
  Root: typeof CollapsibleRoot;
  Trigger: typeof Trigger;
  Panel: typeof Panel;
  DefaultTrigger: typeof DefaultTrigger;
  DefaultPanel: typeof DefaultPanel;
};

export {
  Collapsible,
  CollapsibleRoot,
  Trigger as CollapsibleTrigger,
  Panel as CollapsiblePanel,
  DefaultTrigger as CollapsibleDefaultTrigger,
  DefaultPanel as CollapsibleDefaultPanel
};
