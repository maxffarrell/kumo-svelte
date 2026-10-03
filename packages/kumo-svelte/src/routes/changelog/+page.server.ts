import { getChangelogPage } from '#lib/docs/changelog.server.js';

export function load() {
  return getChangelogPage(1);
}
