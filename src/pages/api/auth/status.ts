import type { APIContext } from 'astro';

export async function GET({ cookies }: APIContext) {
  const token = cookies.get('jwt')?.value;

  return new globalThis.Response(JSON.stringify({ authenticated: Boolean(token) }), {
    status: 200,
  });
}
