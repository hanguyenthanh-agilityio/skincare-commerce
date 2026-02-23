import type { APIContext } from 'astro';

// Constants
import { ROUTER } from '@/constants';

export async function POST({ locals, redirect }: APIContext) {
  const session = locals.session;

  // Destroy session in KV
  await session.destroy();

  return redirect(ROUTER.HOME);
}
