export const CANONICAL_DOCS = {
  colors: 'https://kumo-ui.com/colors',
  figma: 'https://kumo-ui.com/figma',
  skill: 'https://kumo-ui.com/skill'
} as const;

export type CanonicalDoc = keyof typeof CANONICAL_DOCS;

export function canonicalDocRedirect(doc: CanonicalDoc) {
  return new Response(null, {
    status: 307,
    headers: { location: CANONICAL_DOCS[doc] }
  });
}
