export const autoInsetClasses =
  "group-has-[[data-kumo-part=icon]]/menu:not-has-[[data-kumo-part=icon]]:pl-8";
export const menuRowClasses =
  "relative flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-base outline-hidden select-none focus:text-kumo-default focus-visible:ring-2 focus-visible:ring-kumo-brand data-highlighted:bg-kumo-tint data-disabled:pointer-events-none data-disabled:opacity-50 " +
  autoInsetClasses;
export const popupClasses =
  "group/menu overflow-hidden bg-kumo-control text-kumo-default outline-hidden max-h-[var(--bits-floating-available-height)] overflow-y-auto rounded-lg shadow-lg ring ring-kumo-line min-w-36 p-1.5 origin-(--bits-floating-transform-origin) transition-[transform,scale,opacity] duration-150 motion-reduce:transition-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95";
