import { mkdir, readFile, writeFile } from "node:fs/promises";
import { relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const packageConfig = new URL(
  "../packages/kumo-svelte/.wrangler/deploy/config.json",
  import.meta.url,
);
const rootDeployDirectory = new URL("../.wrangler/deploy/", import.meta.url);
const config = JSON.parse(await readFile(packageConfig, "utf8"));
const workerConfig = new URL(config.configPath, packageConfig);

await mkdir(rootDeployDirectory, { recursive: true });
await writeFile(
  new URL("config.json", rootDeployDirectory),
  JSON.stringify({
    ...config,
    configPath: relative(
      fileURLToPath(rootDeployDirectory),
      fileURLToPath(workerConfig),
    ).split(sep).join("/"),
  }),
);
