import type { CollectionEntry } from 'astro:content';

const WORDS_PER_MINUTE = 200;

export function estimateReadingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatBlogDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function pickRelatedPosts(
  posts: CollectionEntry<'blog'>[],
  currentId: string,
  count = 2,
): CollectionEntry<'blog'>[] {
  const others = posts.filter((post) => post.id !== currentId);
  if (others.length <= count) return others;

  let hash = 0;
  for (const char of currentId) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  const shuffled = [...others];
  for (let i = shuffled.length - 1; i > 0; i--) {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    const j = hash % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}
