import Root, {
  PopoverTrigger as Trigger,
  PopoverContent as Content,
  PopoverTitle as Title,
  PopoverDescription as Description,
  PopoverClose as Close
} from './Popover.svelte';

const PopoverRoot = Root;

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
