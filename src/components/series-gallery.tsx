"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PhotoSeries } from "@/content/series";
import { Lightbox } from "@/components/lightbox";
import { cn } from "@/lib/utils";

interface SeriesGalleryProps {
  series: PhotoSeries;
}

export function SeriesGallery({ series }: SeriesGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(() => new Set());
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());

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
  }, [series.images]);

  const setItemRef = useCallback((id: string, node: HTMLElement | null) => {
    if (node) itemRefs.current.set(id, node);
    else itemRefs.current.delete(id);
  }, []);

  const lightboxImages = series.images.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    title: img.id.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    year: series.year,
    width: img.width,
    height: img.height,
    set: img.category,
  }));

  return (
    <>
      <section className="px-5 pb-16 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#featured"
            className="group mb-6 inline-flex items-center gap-2 text-sm tracking-wide text-fg-muted transition-colors hover:text-fg"
          >
            <span
              aria-hidden
              className="translate-x-0 transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to home
          </Link>

          <header className="mb-12">
            <p className="text-xs uppercase tracking-widest text-accent">
              {series.year} · Photo Series
            </p>
            <h1 className="mt-2 font-display text-5xl tracking-wide text-fg sm:text-6xl lg:text-7xl">
              {series.title}
            </h1>
            {series.subtitle && (
              <p className="mt-3 text-lg text-fg-muted sm:text-xl">
                {series.subtitle}
              </p>
            )}
            <p className="mt-4 max-w-2xl text-sm text-fg-muted/80 sm:text-base">
              {series.description}
            </p>
          </header>

          <ul className="columns-1 gap-4 sm:columns-2 sm:gap-5 lg:columns-3 lg:gap-6">
            {series.images.map((image, index) => {
              const isVisible = visibleIds.has(image.id);
              return (
                <li
                  key={image.id}
                  ref={(node) => setItemRef(image.id, node)}
                  data-image-id={image.id}
                  className={cn(
                    "mb-4 break-inside-avoid sm:mb-5 lg:mb-6",
                    "motion-safe-hidden opacity-0",
                    isVisible && "animate-fade-up opacity-100"
                  )}
                  style={
                    isVisible
                      ? { animationDelay: `${Math.min(index % 6, 5) * 0.08}s` }
                      : undefined
                  }
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="group relative block w-full text-left focus-visible:outline-offset-4"
                    aria-label={`View ${image.alt}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      loading={index < 3 ? "eager" : "lazy"}
                    />
                    {image.category && (
                      <span className="mt-2 block text-xs tracking-wide text-fg-muted sm:text-sm">
                        <span className="capitalize">
                          {image.category.replace(/-/g, " ")}
                        </span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <Lightbox
        images={lightboxImages}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </>
  );
}
