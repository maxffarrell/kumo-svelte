import Root, { type KumoPopoverPart } from './Popover.svelte';

const PopoverRoot = Root;

export type { KumoPopoverPart };

const part = (part: KumoPopoverPart) =>
  ((anchor: Parameters<typeof Root>[0], props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as any;

const Trigger = part('trigger');
const Content = part('content');
const Title = part('title');
const Description = part('description');
const Close = part('close');

const Popover = Object.assign(Root, {
  Root: PopoverRoot,
  Trigger,
  Content,
  Title,
  Description,
  Close
}) as typeof Root & {
  Root: typeof PopoverRoot;
  Trigger: typeof Trigger;
  Content: typeof Content;
  Title: typeof Title;
  Description: typeof Description;
  Close: typeof Close;
};

export {
  Popover,
  PopoverRoot,
  Trigger as PopoverTrigger,
  Content as PopoverContent,
  Title as PopoverTitle,
  Description as PopoverDescription,
  Close as PopoverClose
};
