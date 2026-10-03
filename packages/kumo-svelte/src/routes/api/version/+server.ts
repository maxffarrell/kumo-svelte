

export function GET() {
  return Response.json({
    kumoVersion: __KUMO_VERSION__,
    docsVersion: __DOCS_VERSION__,
    buildDate: __BUILD_DATE__
  });
}
