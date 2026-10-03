import { canonicalDocRedirect } from '#lib/docs/canonicalDocs.js';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => canonicalDocRedirect('skill');
