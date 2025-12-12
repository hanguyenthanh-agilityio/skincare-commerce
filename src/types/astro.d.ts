/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.astro' {
  import { AstroComponentFactory } from 'astro';
  const Component: AstroComponentFactory<any>;
  export default Component;
}
