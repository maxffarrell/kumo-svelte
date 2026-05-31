#!/bin/bash
set -euo pipefail

# Kumo Svelte Preview Deployment Script
# Uploads a new Worker version, outputs report artifact
#
# PREREQUISITES:
# - Preview URLs must be enabled in Cloudflare dashboard:
#   Workers & Pages > kumo-svelte > Settings > Domains & Routes > Preview URLs > Enable
# - wrangler.jsonc must have "preview_urls": true (already configured)

echo "Starting kumo-svelte preview deployment..."

# Verify Cloudflare credentials
if [ -z "$CLOUDFLARE_API_TOKEN" ] || [ -z "$CLOUDFLARE_ACCOUNT_ID" ]; then
  echo "CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID are required"
  exit 1
fi

echo "Building kumo-svelte..."
pnpm build

echo "Uploading version to kumo-svelte worker..."
echo "  Using wrangler version: $(pnpm --filter kumo-svelte exec wrangler --version)"

# Upload version - capture output regardless of exit code
COMMIT_SHORT="${GITHUB_SHA:0:7}"
COMMIT_SHORT="${COMMIT_SHORT:-local}"
VERSION_OUTPUT=$(pnpm --filter kumo-svelte exec wrangler versions upload --message "Preview for ${COMMIT_SHORT}" 2>&1) || true

echo "$VERSION_OUTPUT"

# Verify upload succeeded by checking for Worker Version ID
if ! echo "$VERSION_OUTPUT" | grep -q "Worker Version ID:"; then
  echo "❌ Failed to upload version - no Worker Version ID in output"
  exit 1
fi

# Try to extract Version Preview URL from wrangler output
PREVIEW_URL=$(echo "$VERSION_OUTPUT" | grep -oE 'Version Preview URL: https://[^ ]+' | sed 's/Version Preview URL: //')

# If wrangler didn't output a preview URL, construct it from the version ID
# Format: https://<version-prefix>-<worker-name>.<subdomain>.workers.dev
if [ -z "$PREVIEW_URL" ]; then
  echo "  Wrangler did not output preview URL, constructing from version ID..."
  VERSION_ID=$(echo "$VERSION_OUTPUT" | grep -oE 'Worker Version ID: [a-f0-9-]+' | sed 's/Worker Version ID: //')
  if [ -n "$VERSION_ID" ]; then
    # Version prefix is first 8 chars of the version ID
    VERSION_PREFIX=$(echo "$VERSION_ID" | cut -c1-8)
    WORKER_NAME="${WORKER_NAME:-kumo-svelte}"
    SUBDOMAIN="${CLOUDFLARE_WORKERS_SUBDOMAIN:-maxfarrell}"
    PREVIEW_URL="https://${VERSION_PREFIX}-${WORKER_NAME}.${SUBDOMAIN}.workers.dev"
    echo "  Constructed preview URL: $PREVIEW_URL"
  fi
fi

if [ -z "$PREVIEW_URL" ]; then
  echo "Failed to determine preview URL"
  echo "Full output was:"
  echo "$VERSION_OUTPUT"
  exit 1
fi

echo "Version uploaded successfully"

export KUMO_DOCS_PREVIEW_URL="$PREVIEW_URL"
echo "Kumo Svelte preview available: $KUMO_DOCS_PREVIEW_URL"

# Output report artifact for the PR reporter job
echo "Writing report artifact..."
pnpm tsx ci/scripts/write-kumo-docs-report.ts

echo "Kumo Svelte preview deployment complete!"
