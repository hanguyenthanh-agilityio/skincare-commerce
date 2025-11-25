/// <reference types="@astro/types" />

interface AstroGlobal {
  currentLocale?: string;
  generator?: string;
}

declare const Astro: AstroGlobal;
