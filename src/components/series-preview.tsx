"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PhotoSeries, SeriesImage } from "@/content/series";
import { getFeaturedImages } from "@/content/series";
import { cn } from "@/lib/utils";

interface SeriesPreviewProps {
  series: PhotoSeries;
  maxImages?: number;
}

export function SeriesPreview({ series, maxImages = 6 }: SeriesPreviewProps) {
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set());
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

  const featuredImages = getFeaturedImages(series).slice(0, maxImages);

  useEffect(() => {
    const nodes = [...itemRefs.current.values()];
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIds((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const id = (entry.target as HTMLElement).dataset.imageId;
            if (id) next.add(id);
          }
          return next;
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    for (const node of nodes) observer.observe(node);
    return () => observer.disconnect();
  }, [featuredImages]);

  const setItemRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  return (
    <section
      className="scroll-mt-16 px-5 py-16 sm:px-8 sm:py-24"
      aria-labelledby="series-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent">
              Featured Series
            </p>
            <h2
              id="series-heading"
              className="font-display text-4xl tracking-wide text-fg sm:text-5xl"
            >
              {series.title}
            </h2>
            {series.subtitle && (
              <p className="mt-2 text-sm text-fg-muted sm:text-base">
                {series.subtitle}
              </p>
            )}
          </div>
          <Link
            href={`/series/${series.slug}`}
            className="group inline-flex items-center gap-2 text-sm tracking-wide text-fg transition-colors hover:text-accent"
          >
            See full series
            <span
              aria-hidden
              className="translate-x-0 transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {featuredImages.map((image, index) => {
            const isVisible = visibleIds.has(image.id);
            return (
              <li
                key={image.id}
                ref={(node) => setItemRef(image.id, node)}
                data-image-id={image.id}
                className={cn(
                  "motion-safe-hidden opacity-0",
                  isVisible && "animate-fade-up opacity-100"
                )}
                style={
                  isVisible
                    ? { animationDelay: `${Math.min(index, 5) * 0.08}s` }
                    : undefined
                }
              >
                <Link
                  href={`/series/${series.slug}`}
                  className="group relative block aspect-[2/3] overflow-hidden bg-bg-elevated"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href={`/series/${series.slug}`}
            className="inline-flex items-center gap-2 rounded-full border border-fg/20 px-6 py-3 text-sm tracking-wide text-fg transition-colors hover:border-accent hover:text-accent"
          >
            See full series
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
