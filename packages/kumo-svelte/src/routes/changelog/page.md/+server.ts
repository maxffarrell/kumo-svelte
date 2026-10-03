import type { RequestHandler } from './$types';
import { renderChangelogMarkdown } from '#lib/docs/changelog.js';
import { parseChangelog } from '#lib/docs/changelog.server.js';

export const prerender = true;

export const GET: RequestHandler = () => {
  return new Response(renderChangelogMarkdown(parseChangelog()), {
    headers: {
      'content-type': 'text/markdown; charset=utf-8'
    }
  });
};
