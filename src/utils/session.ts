import type { APIContext } from 'astro';

export const getSession = (context: APIContext) => {
  return context.locals.session;
};
