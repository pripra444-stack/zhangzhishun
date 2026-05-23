// src/utils/assets.ts
// Resolves public asset paths accounting for Vite's base URL (e.g. /zhangzhishun/ on GitHub Pages)

const BASE = import.meta.env.BASE_URL  // '/' in dev, '/zhangzhishun/' in prod

/**
 * Returns the correct URL for a file in /public, prepending the base path.
 * Usage: img('/images/foo.png') → '/zhangzhishun/images/foo.png' on GitHub Pages
 */
export function img(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path
  return `${BASE}${clean}`
}

/** Same as img() but wrapped in CSS url() for use in inline styles */
export function cssUrl(path: string): string {
  return `url(${img(path)})`
}
