import { describe, expect, it } from 'vitest';
import { CANONICAL_DOCS, canonicalDocRedirect, type CanonicalDoc } from './canonicalDocs';

describe('canonical docs redirects', () => {
  it.each(Object.entries(CANONICAL_DOCS) as Array<[CanonicalDoc, string]>)('%s redirects to %s', (doc, url) => {
    const response = canonicalDocRedirect(doc);

    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe(url);
  });
});
