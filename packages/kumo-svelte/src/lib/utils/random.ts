import { hydratable } from "svelte";
import { getContext, setContext } from "svelte";

const KUMO_RANDOM_CONTEXT = "kumo:random-sequence";

export interface KumoRandomSequence {
  next(): number;
  int(min: number, max: number): number;
  float(min: number, max: number): string;
}

function createSequence(seed: number): KumoRandomSequence {
  let state = seed >>> 0 || 1;

  const sequence: KumoRandomSequence = {
    next() {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    },
    int(min, max) {
      return Math.floor(sequence.next() * (max - min + 1) + min);
    },
    float(min, max) {
      return (sequence.next() * (max - min) + min).toFixed(2);
    },
  };

  return sequence;
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

  return {
    next: () => Math.random(),
    int: (min, max) => Math.floor(Math.random() * (max - min + 1) + min),
    float: (min, max) => (Math.random() * (max - min) + min).toFixed(2),
  };
}
