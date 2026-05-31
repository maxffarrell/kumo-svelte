import FlowRoot from './Flow.svelte';
import type { KumoFlowPart } from './Flow.svelte';

export { default as FlowRoot } from './Flow.svelte';

const part = (part: KumoFlowPart) =>
  ((anchor: Element, props: Record<string, unknown> = {}) =>
    (FlowRoot as unknown as (anchor: Element, props: Record<string, unknown>) => ReturnType<typeof FlowRoot>)(anchor, {
      ...props,
      __part: part
    })) as unknown as typeof FlowRoot;

const FlowNode = part('node');
const FlowParallel = part('parallel');
const FlowList = part('list');
const FlowAnchor = part('anchor');

export const Flow = Object.assign(FlowRoot, {
  Node: FlowNode,
  Parallel: FlowParallel,
  List: FlowList,
  Anchor: FlowAnchor
}) as typeof FlowRoot & {
  Node: typeof FlowNode;
  Parallel: typeof FlowParallel;
  List: typeof FlowList;
  Anchor: typeof FlowAnchor;
};

export { FlowAnchor, FlowList, FlowNode, FlowParallel };

export type { FlowAlign, FlowOrientation } from './context';
