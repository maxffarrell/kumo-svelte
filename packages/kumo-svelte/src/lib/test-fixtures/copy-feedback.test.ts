import { fireEvent, render, screen } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, describe, expect, it, vi } from "vitest";
import Host from "./CopyFeedbackHost.svelte";
afterEach(() => vi.useRealTimers());
describe("copy feedback attempt lifecycle", () => {
  it("restarts feedback from the last repeated copy", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    render(Host, { copy: async () => {} });
    screen.getByRole("button").click();
    await tick();
    await vi.advanceTimersByTimeAsync(800);
    screen.getByRole("button").click();
    await tick();
    await vi.advanceTimersByTimeAsync(800);
    expect(screen.getByRole("button")).toHaveTextContent("Copied");
    await vi.advanceTimersByTimeAsync(200);
    expect(screen.getByRole("button")).toHaveTextContent(/^Copy$/);
  });
  it("ignores a stale success after a newer failure and after unmount", async () => {
    let resolve!: () => void;
    const copy = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((r) => {
            resolve = r;
          }),
      )
      .mockRejectedValueOnce(new Error("denied"));
    const { unmount } = render(Host, { copy });
    screen.getByRole("button").click();
    screen.getByRole("button").click();
    await tick();
    resolve();
    await tick();
    expect(screen.getByRole("button")).toHaveTextContent(/^Copy$/);
    unmount();
  });
});
