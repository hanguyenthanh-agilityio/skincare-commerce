/// <reference types="@astro/types" />
/// <reference types="happy-dom" />

interface AstroGlobal {
  currentLocale?: string;
  generator?: string;
}

declare const Astro: AstroGlobal;
