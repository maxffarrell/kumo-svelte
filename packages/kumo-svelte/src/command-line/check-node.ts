// CVE-2026-111497 is fixed in these Node.js security releases.
const [major, minor, patch] = process.versions.node.split(".").map(Number);
const minimum = new Map([[24, [22, 1]], [26, [12, 1]]]).get(major);
if (
  !Number.isInteger(patch) ||
  !minimum ||
  minor < minimum[0] ||
  (minor === minimum[0] && patch < minimum[1])
) {
  throw new Error("CVE-2026-111497: use patched Node.js 24.22.1+ or 26.12.1+ on the corresponding major.");
}

export {};
