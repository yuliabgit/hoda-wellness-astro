export function isImagePath(str: string | undefined | null): boolean {
  if (!str) return false;
  return /\.(jpe?g|png|webp|gif|svg|avif)(\?.*)?$/i.test(String(str).trim());
}
