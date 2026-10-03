import { error } from '@sveltejs/kit';
import { getChangelogPage } from '#lib/docs/changelog.server.js';

export const prerender = false;

export function entries() {
  const { totalPages } = getChangelogPage(1);
  return Array.from({ length: Math.max(totalPages - 1, 0) }, (_, index) => ({
    page: String(index + 2)
  }));
}

export function load({ params }) {
  const page = Number(params.page);

  if (!Number.isInteger(page) || page < 2) {
    error(404, 'Not found');
  }

  const data = getChangelogPage(page);

  if (page > data.totalPages) {
    error(404, 'Not found');
  }

  return data;
}
