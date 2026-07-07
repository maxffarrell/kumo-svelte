export { cn } from "cnfast";

const toHex = (n: number) => n.toString(16).padStart(2, "0");

export function safeRandomId(): string {
  const g = typeof globalThis !== "undefined" ? globalThis : undefined;
  const c = g?.crypto;
  if (c && typeof c.randomUUID === "function") {
    return c.randomUUID();
  }
  if (c && typeof c.getRandomValues === "function") {
    const bytes = new Uint8Array(16);
    c.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, toHex).join("");
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  return `r${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
}
