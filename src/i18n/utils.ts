import { ROUTER } from '@/constants';

export const buildRoute = (
  path: (typeof ROUTER)[keyof typeof ROUTER],
  lang: string,
  params: Record<string, string> = {},
) => {
  let finalPath = path;

  for (const [k, v] of Object.entries(params)) {
    finalPath = finalPath.replace(`:${k}`, v);
  }

  return `/${lang}/${finalPath}`;
};
