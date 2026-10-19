import Portal from './PopoverPortal.svelte';
import Positioner from './PopoverPositioner.svelte';
import Popup from './PopoverPopup.svelte';
import Arrow from './PopoverArrow.svelte';
import Viewport from './PopoverViewport.svelte';
import Backdrop from './PopoverBackdrop.svelte';
import Root from './Popover.svelte';
import PopoverRoot from './PopoverRoot.svelte';
import Trigger from './PopoverTrigger.svelte';
import Content from './PopoverContent.svelte';
import Title from './PopoverTitle.svelte';
import Description from './PopoverDescription.svelte';
import Close from './PopoverClose.svelte';

const Popover = Object.assign(Root, {
  Root: PopoverRoot,
  Portal,
  Positioner,
  Popup,
  Arrow,
  Viewport,
  Backdrop,

  Trigger,
  Content,
  Title,
  Description,
  Close
}) as typeof Root & {
  Root: typeof PopoverRoot;
  Portal: typeof Portal;
  Positioner: typeof Positioner;
  Popup: typeof Popup;
  Arrow: typeof Arrow;
  Viewport: typeof Viewport;
  Backdrop: typeof Backdrop;

  Trigger: typeof Trigger;
  Content: typeof Content;
  Title: typeof Title;
  Description: typeof Description;
  Close: typeof Close;
};

export {
  Popover,
  Portal as PopoverPortal,
  Positioner as PopoverPositioner,
  Popup as PopoverPopup,
  Arrow as PopoverArrow,
  Viewport as PopoverViewport,
  Backdrop as PopoverBackdrop,

  PopoverRoot,
  Trigger as PopoverTrigger,
  Content as PopoverContent,
  Title as PopoverTitle,
  Description as PopoverDescription,
  Close as PopoverClose
};
