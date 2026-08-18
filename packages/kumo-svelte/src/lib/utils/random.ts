import { hydratable } from "svelte";
import { getContext, setContext } from "svelte";

const KUMO_RANDOM_CONTEXT = "kumo:random-sequence";

export interface KumoRandomSequence {
  next(): number;
}

function createSequence(seed: number): KumoRandomSequence {
  let state = seed >>> 0 || 1;

  return {
    next() {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    },
  };
}

export function provideKumoRandom(): void {
  if (getContext<KumoRandomSequence | undefined>(KUMO_RANDOM_CONTEXT)) return;

  const seed = hydratable("kumo:random-seed", () => Math.random());
  setContext(KUMO_RANDOM_CONTEXT, createSequence(seed));
}

export function useKumoRandom(): KumoRandomSequence {
  const sequence = getContext<KumoRandomSequence | undefined>(
    KUMO_RANDOM_CONTEXT,
  );
  if (sequence) return createSequence(sequence.next() * 0xffffffff);

  return { next: () => Math.random() };
}

export function randomInt(
  sequence: KumoRandomSequence,
  min: number,
  max: number,
): number {
  return Math.floor(sequence.next() * (max - min + 1) + min);
}

export function randomFloat(
  sequence: KumoRandomSequence,
  min: number,
  max: number,
): string {
  return (sequence.next() * (max - min) + min).toFixed(2);
}
