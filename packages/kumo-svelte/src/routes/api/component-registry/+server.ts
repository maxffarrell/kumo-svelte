
import registry from '../../../../ai/component-registry.json';

export function GET() {
  return Response.json(registry);
}
