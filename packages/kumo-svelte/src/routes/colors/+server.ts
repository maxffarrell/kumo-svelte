import { canonicalDocRedirect } from '$lib/docs/canonicalDocs';
import type { RequestHandler } from './$types';

export const prerender = false;

export const GET: RequestHandler = () => canonicalDocRedirect('colors');
