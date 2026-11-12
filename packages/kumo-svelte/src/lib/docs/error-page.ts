const errors: Partial<Record<number, readonly [title: string, description: string]>> = {
  400: ['Bad request', 'Check the address and try again.'],
  401: ['Sign-in required', 'Sign in to continue.'],
  403: ['Access denied', 'You don’t have permission to view this page.'],
  404: ['Page not found', "This page isn't available. It may have moved, been renamed, or been removed."],
  405: ['Method not allowed', 'This page doesn’t support that request.'],
  410: ['Page removed', 'This page is no longer available.'],
  429: ['Too many requests', 'Wait a moment and try again.'],
  500: ['Internal server error', 'We couldn’t load this page. Try again in a moment.'],
  502: ['Bad gateway', 'We couldn’t reach an upstream service. Try again in a moment.'],
  503: ['Service unavailable', 'The docs are temporarily unavailable. Try again in a moment.'],
  504: ['Gateway timeout', 'The server took too long to respond. Try again in a moment.']
};

export function getErrorPage(status: number) {
  const [title, description] = errors[status] ?? (
    status >= 500
      ? ['Server error', 'We couldn’t load this page. Try again in a moment.']
      : ['Request failed', 'We couldn’t open this page. Check the address and try again.']
  );
  return { title, description };
}
