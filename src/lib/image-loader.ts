/**
 * Custom loader so static-export images honor basePath on GitHub Pages.
 * next/image with `unoptimized` alone skips basePath for public assets.
 */
export default function imageLoader({ src }: { src: string }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  if (base && src.startsWith(`${base}/`)) return src;
  return `${base}${src}`;
}
