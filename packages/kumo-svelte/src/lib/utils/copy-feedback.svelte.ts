import { onDestroy } from 'svelte';
/** Each attempt invalidates earlier asynchronous writes and restarts feedback. */
export function createCopyFeedback(duration = 2000) {
 let copied = $state(false);
 let attempt = 0;
 let timer: ReturnType<typeof setTimeout> | undefined;
 function reset() { attempt++; clearTimeout(timer); timer = undefined; copied = false; }
 onDestroy(reset);
 return {
  get copied() { return copied; }, reset,
  async runCopy(copy: () => Promise<unknown> | unknown) {
   const current = ++attempt;
   clearTimeout(timer);
   try {
    await copy();
    if (current !== attempt) return false;
    copied = true;
    timer = setTimeout(() => { if (current === attempt) copied = false; }, duration);
    return true;
   } catch (error) { if (current === attempt) copied = false; throw error; }
  }
 };
}
