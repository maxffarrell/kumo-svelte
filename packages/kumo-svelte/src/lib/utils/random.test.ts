import { describe, expect, it } from "vitest";
import { createKumoRandomSequence } from "./random";

describe("Kumo random sequence", () => {
  it("produces the same values for the same seed", () => {
    const first = createKumoRandomSequence(123456789);
    const second = createKumoRandomSequence(123456789);

    expect([first.next(), first.next(), first.next()]).toEqual([
      second.next(),
      second.next(),
      second.next(),
    ]);
  });

  it("produces different values for different seeds", () => {
    const first = createKumoRandomSequence(1);
    const second = createKumoRandomSequence(2);

    expect(first.next()).not.toBe(second.next());
  });

  it("generates bounded integers and floats", () => {
    const sequence = createKumoRandomSequence(123456789);

    for (let index = 0; index < 100; index += 1) {
      const integer = sequence.int(10, 20);
      const float = sequence.float(1.5, 2.5);

      expect(integer).toBeGreaterThanOrEqual(10);
      expect(integer).toBeLessThanOrEqual(20);
      expect(float).toBeGreaterThanOrEqual(1.5);
      expect(float).toBeLessThan(2.5);
    }
  });
});
