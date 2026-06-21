import type { ImageMetadata } from 'astro';

const images = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/images/**/*.{jpg,jpeg,png,webp,gif,avif}',
  { eager: true, import: 'default' },
);

/** Resolve a public-style path (e.g. /images/hero.jpg) to an optimized asset import. */
export function resolveAssetImage(path: string | undefined): ImageMetadata | undefined {
  if (!path) return undefined;

  const normalized = path
    .replace(/^\/?images\//, '')
    .replace(/^\//, '')
    .replace(/\\/g, '/');

  const entry = Object.entries(images).find(([key]) =>
    key.replace(/\\/g, '/').endsWith(`/${normalized}`),
  );

  return entry ? entry[1] : undefined;
}

/** Whether the path points at a CMS upload outside src/assets (fallback to plain img). */
export function isPublicUpload(path: string): boolean {
  return path.includes('/images/uploads/') || path.includes('images/uploads/');
}
